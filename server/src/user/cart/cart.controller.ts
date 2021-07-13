import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { JwtAuthGuard } from "../../auth/guards/jwtAuth.guard";
import { CartService } from "./cart.service";
import { User } from "../entities/user.entity";

@Controller("user/cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCartItems(@Req() req: Request) {
    return this.cartService.getCartItems((req.user as User).id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addCartItem(
    @Req() req: Request,
    @Body("productId") productId: string,
    @Body("amount", ParseIntPipe) amount: number,
  ) {
    return this.cartService.addCartItem((req.user as User).id, productId, amount);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateCartItemAmount(
    @Req() req: Request,
    @Body("productId") productId: string,
    @Body("amount", ParseIntPipe) amount: number,
  ) {
    return this.cartService.updateCartItemAmount((req.user as User).id, productId, amount);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async removeCartItem(@Req() req: Request, @Body("productId") productId: string) {
    return this.cartService.removeCartItem((req.user as User).id, productId);
  }
}
