import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/core";

import { CreateCategoryDto } from "./dto/createCategory.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoryService {
  constructor(private readonly em: EntityManager) {}

  async findOne(id: string): Promise<Category> {
    return this.em.getRepository(Category).findOneOrFail({ id });
  }

  async find(): Promise<Category[]> {
    return this.em.getRepository(Category).findAll();
  }

  async create({ name }: CreateCategoryDto): Promise<Category> {
    const category = this.em.getRepository(Category).create({ name });

    await this.em.getRepository(Category).persistAndFlush(category);
    return category;
  }

  async update(id: string, { name }: UpdateCategoryDto): Promise<Category> {
    const category = await this.em.getRepository(Category).findOneOrFail({ id });

    category.name = name || category.name;

    await this.em.getRepository(Category).persistAndFlush(category);
    return category;
  }

  async delete(id: string): Promise<Category> {
    const category = await this.em.getRepository(Category).findOneOrFail({ id });

    await this.em.getRepository(Category).removeAndFlush(category);
    return category;
  }
}
