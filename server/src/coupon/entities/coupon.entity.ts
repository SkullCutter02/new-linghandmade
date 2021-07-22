import { Entity, EntityRepositoryType, Property } from "@mikro-orm/core";

import { BaseEntity } from "../../shared/base.entity";
import { CouponRepository } from "../repositories/coupon.repository";

@Entity({ tableName: "coupons", customRepository: () => CouponRepository })
export class Coupon extends BaseEntity {
  @Property({ unique: true })
  code: string;

  @Property()
  discount: number;

  @Property({ default: false })
  used: boolean = false;

  @Property({ nullable: true })
  remarks?: string;

  [EntityRepositoryType]?: CouponRepository;
}
