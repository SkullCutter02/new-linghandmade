import { Entity, ManyToOne, Property } from "@mikro-orm/core";

import { User } from "./user.entity";
import { Product } from "../../product/entities/product.entity";

@Entity({ tableName: "users_in_cart_products" })
export class UserInCartProducts {
  @ManyToOne(() => User, { primary: true, nullable: true, onDelete: "cascade" })
  user: User;

  @ManyToOne(() => Product, { primary: true, nullable: true })
  product: Product;

  @Property()
  amount: number;

  toJSON(): this {
    return { ...this, user: undefined };
  }
}
