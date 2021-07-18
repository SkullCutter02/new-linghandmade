import { Injectable } from "@nestjs/common";
import * as voucherCodes from "voucher-code-generator";

import { CouponRepository } from "./repositories/coupon.repository";
import { CreateCouponDto } from "./dto/createCoupon.dto";

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

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
