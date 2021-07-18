import { EntityRepository } from "@mikro-orm/core";
import { Coupon } from "../entities/coupon.entity";

export class CouponRepository extends EntityRepository<Coupon> {}
