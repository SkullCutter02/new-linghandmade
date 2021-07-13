import { Collection, Entity, EntityRepositoryType, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { IsOptional, Max, Min } from "class-validator";

import { BaseEntity } from "../../shared/base.entity";
import { ProductRepository } from "../repositories/product.repository";
import { Category } from "../../category/entities/category.entity";
import { UserInCartProducts } from "../../user/entities/userInCartProducts.entity";

@Entity({ tableName: "products", customRepository: () => ProductRepository })
export class Product extends BaseEntity {
  @Property()
  name: string;

  @Property({ type: "text" })
  description: string;

  @Property()
  price: number;

  @IsOptional()
  @Min(0)
  @Max(100)
  @Property({ nullable: true })
  discount?: number = 0;

  @Property()
  mainImgUrl: string;

  @Property({ nullable: true })
  carouselImgUrls?: string[];

  @Property()
  amtLeft: number = 0;

  @Property()
  featured: boolean = false;

  @Property({ nullable: true })
  remarks?: string;

  @ManyToOne(() => Category, { onDelete: "cascade" })
  category: Category;

  @OneToMany(() => UserInCartProducts, (userInCartProducts) => userInCartProducts.product)
  userInCartProducts = new Collection<UserInCartProducts>(this);

  [EntityRepositoryType]?: ProductRepository;
}
