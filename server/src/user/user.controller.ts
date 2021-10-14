import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { PaginationDto } from "../shared/pagination.dto";
import { UserService } from "./user.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";
import { User } from "./entities/user.entity";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AdminAuthGuard)
  async find(@Query() paginationDto: PaginationDto) {
    return this.userService.find(paginationDto);
  }

  @Get("/order")
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@Req() req: Request) {
    return this.userService.getOrders(req.user as User);
  }
}
