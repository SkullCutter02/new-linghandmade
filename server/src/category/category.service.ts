import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/core";

import { CreateCategoryDto } from "./dto/createCategory.dto";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoryService {
  constructor(private readonly em: EntityManager) {}

  async findOne(id: string) {
    return this.em.getRepository(Category).findOneOrFail({ id });
  }

  async find() {
    return this.em.getRepository(Category).findAll();
  }

  async create({ name }: CreateCategoryDto): Promise<Category> {
    const category = this.em.getRepository(Category).create({ name });

    await this.em.getRepository(Category).persistAndFlush(category);
    return category;
  }
}
