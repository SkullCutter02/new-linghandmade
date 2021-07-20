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
    const amount = (await this.productService.getPrice((req.user as User).id, couponId)) * 100; // in cents

    if (couponId) await this.couponService.useCoupon(couponId);

    await this.stripeService.charge(amount, paymentMethodId, (req.user as User).stripeCustomerId);
    await this.orderService.create(createOrderDto, req.user as User);
    await this.cartService.clearCart((req.user as User).id);

    return { checkout: "Successful" };
  }
}
