import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { CouponController } from "./coupon.controller";
import { CouponService } from "./coupon.service";
import { Coupon } from "./entities/coupon.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Coupon])],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
