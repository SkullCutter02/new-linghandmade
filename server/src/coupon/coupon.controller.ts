import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";

import { CouponService } from "./coupon.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { CreateCouponDto } from "./dto/createCoupon.dto";

@Controller("coupon")
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }
}
