import { Module } from "@nestjs/common";
import { ChargeController } from "./charge.controller";
import { StripeService } from "../stripe/stripe.service";
import { ProductModule } from "../product/product.module";
import { CouponModule } from "../coupon/coupon.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [ProductModule, CouponModule, UserModule],
  controllers: [ChargeController],
  providers: [StripeService],
})
export class ChargeModule {}
