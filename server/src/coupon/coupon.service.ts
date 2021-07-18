import { Injectable } from "@nestjs/common";
import * as voucherCodes from "voucher-code-generator";

import { CouponRepository } from "./repositories/coupon.repository";
import { CreateCouponDto } from "./dto/createCoupon.dto";
import { PaginationDto } from "../shared/pagination.dto";

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

  async findOne(couponId: string) {
    return this.couponRepository.findOneOrFail({ id: couponId });
  }

  async find({ page, limit, filter }: PaginationDto) {
    const [coupons, count] = await this.couponRepository.findAndCount(
      { code: { $ilike: `%${filter}%` } },
      { limit, offset: (page - 1) * limit },
    );
    return { coupons, hasMore: count > page * limit };
  }

  async create({ discount }: CreateCouponDto) {
    const code = voucherCodes.generate({
      length: 8,
      count: 1,
    })[0];

    const coupon = this.couponRepository.create({ code, discount });

    await this.couponRepository.persistAndFlush(coupon);
    return coupon;
  }
}
