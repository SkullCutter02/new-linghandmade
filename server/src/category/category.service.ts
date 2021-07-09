import { Injectable } from "@nestjs/common";

import { CreateCategoryDto } from "./dto/createCategory.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";
import { Category } from "./entities/category.entity";
import { CategoryRepository } from "./repositories/category.repository";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOneOrFail({ id });
  }

  async find(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async create({ name }: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create({ name });

    await this.categoryRepository.persistAndFlush(category);
    return category;
  }

  async update(id: string, { name }: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOneOrFail({ id });

    category.name = name || category.name;

    await this.categoryRepository.persistAndFlush(category);
    return category;
  }

  async delete(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneOrFail({ id });

    await this.categoryRepository.removeAndFlush(category);
    return category;
  }
}
