import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/cart")
  @UseGuards(JwtAuthGuard)
  async getCartItems(@Req() req: Request) {
    return this.userService.getCartItems((req.user as User).id);
  }

  @Post("/cart")
  @UseGuards(JwtAuthGuard)
  async addCartItem(
    @Req() req: Request,
    @Body("productId") productId: string,
    @Body("amount", ParseIntPipe) amount: number,
  ) {
    return this.userService.addCartItem((req.user as User).id, productId, amount);
  }

  @Patch("/cart")
  @UseGuards(JwtAuthGuard)
  async updateCartItemAmount(
    @Req() req: Request,
    @Body("productId") productId: string,
    @Body("amount", ParseIntPipe) amount: number,
  ) {
    return this.userService.updateCartItemAmount((req.user as User).id, productId, amount);
  }

  @Delete("/cart")
  @UseGuards(JwtAuthGuard)
  async removeCartItem(@Req() req: Request, @Body("productId") productId: string) {
    return this.userService.removeCartItem((req.user as User).id, productId);
  }
}
