import { Entity, EntityRepositoryType, Property } from "@mikro-orm/core";
import { Length } from "class-validator";

import { BaseEntity } from "../../shared/baseEntity.entity";
import { CategoryRepository } from "../repositories/category.repository";

@Entity({ tableName: "categories", customRepository: () => CategoryRepository })
export class Category extends BaseEntity {
  @Property({ unique: true })
  @Length(1, 25)
  name: string;

  [EntityRepositoryType]?: CategoryRepository;
}
