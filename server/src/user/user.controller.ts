import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { PaginationDto } from "../shared/pagination.dto";
import { UserService } from "./user.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AdminAuthGuard)
  async find(@Query() paginationDto: PaginationDto) {
    return this.userService.find(paginationDto);
  }
}
