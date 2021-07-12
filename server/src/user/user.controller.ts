import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";

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

  @Patch("/:id/cart")
  @UseGuards(JwtAuthGuard)
  async updateCartItemAmount(
    @Param("id") userId: string,
    @Body("productId") productId: string,
    @Body("amount", ParseIntPipe) amount: number,
  ) {
    return this.userService.updateCartItemAmount(userId, productId, amount);
  }

  @Delete("/:id/cart")
  @UseGuards(JwtAuthGuard)
  async removeCartItem(@Param("id") userId: string, @Body("productId") productId: string) {
    return this.userService.removeCartItem(userId, productId);
  }
}
