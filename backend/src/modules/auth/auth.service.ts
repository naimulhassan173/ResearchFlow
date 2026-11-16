import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import * as argon2 from "argon2";
import { User } from "../accounts/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}
  async login(dto: LoginDto) {
    const user = await this.users
      .createQueryBuilder("user")
      .addSelect("user.passwordHash")
      .where("LOWER(user.email) = :email", {
        email: dto.email.trim().toLowerCase(),
      })
      .getOne();
    if (
      !user ||
      !user.isActive ||
      !(await argon2.verify(user.passwordHash, dto.password))
    ) {
      throw new UnauthorizedException("Invalid email or password");
    }
    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      version: user.tokenVersion,
    });
    return {
      accessToken,
      tokenType: "Bearer",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    };
  }
  async logout(userId: string) {
    await this.users.increment({ id: userId }, "tokenVersion", 1);
    return { message: "Logged out on all devices" };
  }
}
