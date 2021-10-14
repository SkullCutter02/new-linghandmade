import { Injectable } from "@nestjs/common";

import { StripeService } from "../stripe/stripe.service";
import { ProductService } from "../product/product.service";
import { CouponService } from "../coupon/coupon.service";
import { CartService } from "../user/cart/cart.service";
import { OrderService } from "../order/order.service";
import { EmailService } from "../email/email.service";
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
    private readonly emailService: EmailService,
  ) {}

  async createCharge(
    user: User,
    { couponId, paymentMethodId }: CreateChargeDto,
    createOrderDto: CreateOrderDto,
  ) {
    const amount = Math.round((await this.productService.getPrice(user.id, couponId)) * 100); // in cents
    const cartItems = Array.from(await this.cartService.getCartItems(user.id));

    const coupon = couponId && (await this.couponService.useCoupon(couponId));

    await this.stripeService.charge(amount, paymentMethodId, user.stripeCustomerId);
    await this.orderService.create(
      { ...createOrderDto, price: amount / 100, couponCode: coupon?.code },
      user,
    );
    await this.productService.reduceProductsAmount(user.id);
    await this.cartService.clearCart(user.id);

    await this.emailService.send(
      "Your Ling Handmade Receipt",
      user.email,
      this.emailService.compileHTML("receipt.html", {
        name: createOrderDto.name,
        orderItems: this.cartService.toOrderItems(cartItems),
        price: amount / 100,
        couponDiscount: coupon?.discount,
        originalPrice: amount / 100 / ((100 - coupon?.discount) / 100),
      }),
    );
    // await this.emailService.send(
    //   "A new customer has ordered some items",
    //   "lhmsoap2018@gmail.com",
    //   this.emailService.compileHTML("order.html", {}),
    // );

    return { checkout: "Successful" };
  }
}
