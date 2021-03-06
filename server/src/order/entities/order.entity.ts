import { Entity, EntityRepositoryType, ManyToOne, Property } from "@mikro-orm/core";
import { IsBoolean, IsEmail, IsNumber } from "class-validator";

import { BaseEntity } from "../../shared/base.entity";
import { OrderRepository } from "../repositories/order.repository";
import { User } from "../../user/entities/user.entity";

@Entity({ tableName: "orders", customRepository: () => OrderRepository })
export class Order extends BaseEntity {
  @Property()
  name: string;

  @Property()
  address: string;

  @Property()
  phoneNumber: string;

  @Property()
  @IsEmail()
  email: string;

  @Property()
  @IsNumber()
  price: number;

  @Property({ nullable: true })
  couponCode?: string;

  @Property({ type: "array" })
  orderItems: string[];

  @ManyToOne(() => User)
  user: User;

  [EntityRepositoryType]?: OrderRepository;
}
