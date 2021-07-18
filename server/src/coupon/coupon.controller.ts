import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { CouponService } from "./coupon.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { CreateCouponDto } from "./dto/createCoupon.dto";
import { UpdateCouponDto } from "./dto/updateCoupon.dto";
import { PaginationDto } from "../shared/pagination.dto";

@Controller("coupon")
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get("/:id")
  @UseGuards(AdminAuthGuard)
  async findOne(@Param("id") id: string) {
    return this.couponService.findOne(id);
  }

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

  @Patch("/:id")
  @UseGuards(AdminAuthGuard)
  @UsePipes(ValidationPipe)
  async update(@Param("id") id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(id, updateCouponDto);
  }

  @Patch("/:id/use")
  @UseGuards(AdminAuthGuard)
  async useCoupon(@Param("id") id: string) {
    return this.couponService.useCoupon(id);
  }
}
