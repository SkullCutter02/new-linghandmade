import { Collection, Entity, EntityRepositoryType, OneToMany, Property } from "@mikro-orm/core";
import { IsEmail, Matches } from "class-validator";

import { BaseEntity } from "../../shared/base.entity";
import { usernameRegex } from "../../shared/regexes";
import { UserRepository } from "../repositories/user.repository";
import { UserInCartProducts } from "./userInCartProducts.entity";
import { Order } from "../../order/entities/order.entity";

@Entity({ tableName: "users", customRepository: () => UserRepository })
export class User extends BaseEntity {
  @Property({ unique: true })
  @Matches(usernameRegex)
  username: string;

  @Property({ unique: true })
  @IsEmail()
  email: string;

  @Property({ nullable: true })
  hash?: string;

  @Property({ default: false })
  isRegisteredWithGoogle: boolean;

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
