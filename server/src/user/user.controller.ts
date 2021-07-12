import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/:id/cart")
  @UseGuards(JwtAuthGuard)
  async getCartItems(@Param("id") userId: string) {
    return this.userService.getCartItems(userId);
  }

  @Post("/:id/cart")
  @UseGuards(JwtAuthGuard)
  async addCartItem(
    @Param("id") userId: string,
    @Body("productId") productId: string,
    @Body("amount", ParseIntPipe) amount: number,
  ) {
    return this.userService.addCartItem(userId, productId, amount);
  }
}
