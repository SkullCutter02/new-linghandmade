import { Collection, Entity, EntityRepositoryType, OneToMany, Property } from "@mikro-orm/core";
import { IsEmail, Matches } from "class-validator";

import { BaseEntity } from "../../shared/base.entity";
import { usernameRegex } from "../../shared/regexes";
import { UserRepository } from "../repositories/user.repository";
import { UserInCartProducts } from "./userInCartProducts.entity";

@Entity({ tableName: "users", customRepository: () => UserRepository })
export class User extends BaseEntity {
  @Property()
  @Matches(usernameRegex)
  username: string;

  @Property()
  @IsEmail()
  email: string;

  @Property()
  hash: string;

  @Property()
  stripeCustomerId: string;

  @OneToMany(() => UserInCartProducts, (userInCartProducts) => userInCartProducts.user)
  userInCartProducts = new Collection<UserInCartProducts>(this);

  [EntityRepositoryType]?: UserRepository;

  toJSON(): this {
    return { ...this, hash: undefined };
  }
}
