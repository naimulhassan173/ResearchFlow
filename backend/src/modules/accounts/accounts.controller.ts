import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccountsService } from "./accounts.service";
import { AccountDto } from "./dto/account.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Public } from "../../common/decorators/public.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "./enums/user_role.enum";
import { AuthUser } from "../../common/interfaces/auth-user.interface";
@ApiTags("Accounts")
@Controller("accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
  @Public()
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post()
  createAccount(@Body() dto: AccountDto) {
    return this.accountsService.createAccount(dto);
  }
  @Roles(UserRole.COORDINATOR)
  @ApiBearerAuth()
  @Patch(":id/role")
  updateRole(
    @CurrentUser() actor: AuthUser,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.accountsService.updateRole(actor, id, dto.role);
  }
}
