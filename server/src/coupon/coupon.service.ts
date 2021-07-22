import { GoneException, Injectable, NotFoundException } from "@nestjs/common";
import * as voucherCodes from "voucher-code-generator";

import { CouponRepository } from "./repositories/coupon.repository";
import { CreateCouponDto } from "./dto/createCoupon.dto";
import { UpdateCouponDto } from "./dto/updateCoupon.dto";
import { PaginationDto } from "../shared/pagination.dto";

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

  async findOneByCode(code: string) {
    return this.couponRepository.findOneOrFail(
      { code, used: false },
      {
        failHandler: () => {
          throw new NotFoundException("No coupon with such code found");
        },
      },
    );
  }

  async findOne(couponId: string) {
    return this.couponRepository.findOneOrFail({ id: couponId });
  }

  async find({ page, limit, filter }: PaginationDto) {
    const [coupons, count] = await this.couponRepository.findAndCount(
      { code: { $ilike: `%${filter}%` } },
      { limit, offset: (page - 1) * limit, orderBy: { updatedAt: "DESC" } },
    );
    return { coupons, hasMore: count > page * limit };
  }

  async create({ discount, remarks }: CreateCouponDto) {
    const code = voucherCodes.generate({
      length: 8,
      count: 1,
    })[0];

    const coupon = this.couponRepository.create({ code, discount, remarks });

    await this.couponRepository.persistAndFlush(coupon);
    return coupon;
  }

  async update(couponId: string, { discount }: UpdateCouponDto) {
    const coupon = await this.couponRepository.findOneOrFail({ id: couponId });

    coupon.assign({ discount });

    await this.couponRepository.persistAndFlush(coupon);
    return coupon;
  }

  async useCoupon(couponId: string) {
    const coupon = await this.couponRepository.findOneOrFail({ id: couponId });

    if (coupon.used) throw new GoneException("Coupon has already been used");

    coupon.assign({ used: true });

    await this.couponRepository.persistAndFlush(coupon);
    return coupon;
  }

  async delete(couponId: string) {
    const coupon = await this.couponRepository.findOneOrFail({ id: couponId });

    await this.couponRepository.removeAndFlush(coupon);
    return coupon;
  }
}
