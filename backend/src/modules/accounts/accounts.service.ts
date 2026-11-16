import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import * as argon2 from "argon2";
import { User } from "./entities/user.entity";
import { AccountDto } from "./dto/account.dto";
import { Profile } from "../profiles/entities/profile.entity";
import { AuthUser } from "../../common/interfaces/auth-user.interface";
import { UserRole } from "./enums/user_role.enum";
import { GroupMember } from "../groups/entities/group-member.entity";
import { Supervision } from "../selection/entities/supervision.entity";
@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  async createAccount(dto: AccountDto) {
    const email = dto.email.trim().toLowerCase();
    if (await this.users.findOneBy({ email }))
      throw new ConflictException("Account with this email already exists");
    const passwordHash = await argon2.hash(dto.password);
    try {
      return await this.users.manager.transaction(async (manager) => {
        const users = manager.getRepository(User);
        const user = await users.save(
          users.create({
            fullName: dto.fullName.trim(),
            email,
            passwordHash,
            role: UserRole.STUDENT,
          }),
        );
        const profiles = manager.getRepository(Profile);
        await profiles.save(profiles.create({ userId: user.id }));
        return {
          message: "Account created successfully",
          user: this.safeUser(user),
        };
      });
    } catch (error) {
      if ((error as { code?: string }).code === "23505")
        throw new ConflictException("Account with this email already exists");
      throw error;
    }
  }
  async updateRole(actor: AuthUser, id: string, role: UserRole) {
    if (actor.role !== UserRole.COORDINATOR) throw new ForbiddenException();
    if (actor.id === id)
      throw new ForbiddenException("You cannot change your own role");
    return this.users.manager.transaction(async (manager) => {
      const users = manager.getRepository(User);
      const user = await users.findOne({
        where: { id },
        lock: { mode: "pessimistic_write" },
      });
      if (!user) throw new NotFoundException("User not found");
      if (user.role !== role) {
        if (
          user.role === UserRole.SUPERVISOR &&
          (await manager
            .getRepository(Supervision)
            .existsBy({ supervisorId: id, endedAt: IsNull() }))
        )
          throw new ConflictException(
            "End active supervision before changing this supervisor's role",
          );
        if (
          user.role === UserRole.STUDENT &&
          (await manager
            .getRepository(GroupMember)
            .existsBy({ userId: id, leftAt: IsNull() }))
        ) {
          throw new ConflictException(
            "Student must leave or archive their active research group before changing role",
          );
        }
        user.role = role;
        user.tokenVersion += 1;
        await users.save(user);
      }
      return {
        message: "Role updated; the user must log in again",
        user: this.safeUser(user),
      };
    });
  }
  safeUser(user: User) {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
