import { Collection, Entity, EntityRepositoryType, OneToMany, Property } from "@mikro-orm/core";
import { Length } from "class-validator";

import { BaseEntity } from "../../shared/base.entity";
import { CategoryRepository } from "../repositories/category.repository";
import { Product } from "../../product/entities/product.entity";

@Entity({ tableName: "categories", customRepository: () => CategoryRepository })
export class Category extends BaseEntity {
  @Property({ unique: true })
  @Length(1, 25)
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Collection<Product> = new Collection<Product>(this);

  [EntityRepositoryType]?: CategoryRepository;
}
