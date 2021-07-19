import { Collection, Entity, EntityRepositoryType, ManyToMany, Property } from "@mikro-orm/core";

import { BaseEntity } from "../../shared/base.entity";
import { OrderRepository } from "../repositories/order.repository";
import { UserInCartProducts } from "../../user/entities/userInCartProducts.entity";
import { Product } from "../../product/entities/product.entity";

@Entity({ tableName: "orders", customRepository: () => OrderRepository })
export class Order extends BaseEntity {
  @Property()
  name: string;

  @Property()
  address: string;

  @Property()
  phoneNumber: string;

  @Property({ type: "array" })
  orderItems: string[];

  // @ManyToMany(() => UserInCartProducts)
  // cartItems: Collection<UserInCartProducts> = new Collection<UserInCartProducts>(this);

  [EntityRepositoryType]?: OrderRepository;
}
