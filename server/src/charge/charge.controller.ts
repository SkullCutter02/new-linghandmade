import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request } from "express";

import { StripeService } from "../stripe/stripe.service";
import { ProductService } from "../product/product.service";
import { CouponService } from "../coupon/coupon.service";
import { CartService } from "../user/cart/cart.service";
import { OrderService } from "../order/order.service";
import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";
import { CreateChargeDto } from "./dto/createCharge.dto";
import { User } from "../user/entities/user.entity";
import { CreateOrderDto } from "../order/dto/createOrder.dto";

@Controller("charge")
export class ChargeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly productService: ProductService,
    private readonly couponService: CouponService,
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createCharge(
    @Req() req: Request,
    @Body() { paymentMethodId, couponId }: CreateChargeDto,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const user = req.user as User;

    const amount = (await this.productService.getPrice(user.id, couponId)) * 100; // in cents

    if (couponId) await this.couponService.useCoupon(couponId);

    await this.stripeService.charge(amount, paymentMethodId, user.stripeCustomerId);
    await this.orderService.create(createOrderDto, user);
    await this.productService.reduceProductsAmount(user.id);
    await this.cartService.clearCart(user.id);

    return { checkout: "Successful" };
  }
}
