import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/core";

import { CreateProductDto } from "./dto/createProduct.dto";
import { Category } from "../category/entities/category.entity";
import { Product } from "./entities/product.entity";
import { PaginationDto } from "../shared/pagination.dto";

@Injectable()
export class ProductService {
  constructor(private readonly em: EntityManager) {}

  async findOne(id: string): Promise<Product> {
    return this.em.getRepository(Product).findOneOrFail({ id }, ["category"]);
  }

  async find({ filter, page, limit }: PaginationDto, categoryId: string): Promise<Product[]> {
    const category = await this.em.getRepository(Category).findOne({ id: categoryId });

    if (!category)
      return this.em
        .getRepository(Product)
        .find(
          { name: { $ilike: `%${filter}%` } },
          { limit, offset: (page - 1) * limit, populate: ["category"] },
        );
    else
      return this.em
        .getRepository(Product)
        .find(
          { name: { $ilike: `%${filter}%` }, category },
          { limit, offset: (page - 1) * limit, populate: ["category"] },
        );
  }

  async create({
    name,
    description,
    price,
    mainImgUrl,
    carouselImgUrls,
    amtLeft,
    featured,
    remarks,
    categoryId,
  }: CreateProductDto): Promise<Product> {
    const category = await this.em.getRepository(Category).findOneOrFail({ id: categoryId });
    const product = this.em.getRepository(Product).create({
      name,
      description,
      price,
      mainImgUrl,
      carouselImgUrls,
      amtLeft,
      featured,
      remarks,
      category,
    });

    await this.em.getRepository(Product).persistAndFlush(product);
    return product;
  }
}
