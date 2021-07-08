import { Entity, EntityRepositoryType, ManyToOne, Property } from "@mikro-orm/core";

import { BaseEntity } from "../../shared/baseEntity.entity";
import { ProductRepository } from "../repositories/product.repository";
import { Category } from "../../category/entities/category.entity";

@Entity({ tableName: "products", customRepository: () => ProductRepository })
export class Product extends BaseEntity {
  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  price: number;

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

  @ManyToOne(() => Category)
  category: Category;

  [EntityRepositoryType]?: ProductRepository;
}
