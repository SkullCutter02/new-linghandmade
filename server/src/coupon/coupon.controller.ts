import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";

import { CouponService } from "./coupon.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { CreateCouponDto } from "./dto/createCoupon.dto";
import { PaginationDto } from "../shared/pagination.dto";

@Controller("coupon")
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  @UseGuards(AdminAuthGuard)
  async find(@Query() paginationDto: PaginationDto) {
    return this.couponService.find(paginationDto);
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }
}
