import { Collection, Entity, Unique, EntityRepositoryType, OneToMany, Property } from "@mikro-orm/core";
import { IsEmail, Matches } from "class-validator";

import { BaseEntity } from "../../shared/base.entity";
import { usernameRegex } from "../../shared/regexes";
import { UserRepository } from "../repositories/user.repository";
import { UserInCartProducts } from "./userInCartProducts.entity";
import { Order } from "../../order/entities/order.entity";

@Entity({ tableName: "users", customRepository: () => UserRepository })
export class User extends BaseEntity {
  @Property()
  @Matches(usernameRegex)
  @Unique()
  username: string;

  @Property()
  @IsEmail()
  @Unique()
  email: string;

  @Property()
  hash: string;

  @Property()
  stripeCustomerId: string;

  @OneToMany(() => UserInCartProducts, (userInCartProducts) => userInCartProducts.user)
  userInCartProducts = new Collection<UserInCartProducts>(this);

  @OneToMany(() => Order, (order) => order.user)
  orders = new Collection<Order>(this);

  [EntityRepositoryType]?: UserRepository;

  toJSON(): this {
    return { ...this, hash: undefined };
  }
}
