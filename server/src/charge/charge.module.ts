import { Module } from "@nestjs/common";
import { ChargeController } from "./charge.controller";
import { StripeService } from "../stripe/stripe.service";
import { ProductModule } from "../product/product.module";
import { CouponModule } from "../coupon/coupon.module";
import { UserModule } from "../user/user.module";
import { OrderModule } from "../order/order.module";
import { ChargeService } from './charge.service';

@Module({
  imports: [ProductModule, CouponModule, UserModule, OrderModule],
  controllers: [ChargeController],
  providers: [StripeService, ChargeService],
})
export class ChargeModule {}
