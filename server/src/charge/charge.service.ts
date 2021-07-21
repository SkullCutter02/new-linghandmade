import { Injectable } from "@nestjs/common";

import { StripeService } from "../stripe/stripe.service";
import { ProductService } from "../product/product.service";
import { CouponService } from "../coupon/coupon.service";
import { CartService } from "../user/cart/cart.service";
import { OrderService } from "../order/order.service";
import { User } from "../user/entities/user.entity";
import { CreateChargeDto } from "./dto/createCharge.dto";
import { CreateOrderDto } from "../order/dto/createOrder.dto";

@Injectable()
export class ChargeService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly productService: ProductService,
    private readonly couponService: CouponService,
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
  ) {}

  async createCharge(
    user: User,
    { couponId, paymentMethodId }: CreateChargeDto,
    createOrderDto: CreateOrderDto,
  ) {
    const amount = (await this.productService.getPrice(user.id, couponId)) * 100; // in cents

    if (couponId) await this.couponService.useCoupon(couponId);

    await this.stripeService.charge(amount, paymentMethodId, user.stripeCustomerId);
    await this.orderService.create(createOrderDto, user);
    await this.productService.reduceProductsAmount(user.id);
    await this.cartService.clearCart(user.id);

    return { checkout: "Successful" };
  }
}
