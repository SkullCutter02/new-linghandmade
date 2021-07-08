import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/core";

import { CreateProductDto } from "./dto/createProduct.dto";
import { Category } from "../category/entities/category.entity";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService {
  constructor(private readonly em: EntityManager) {}

  async findOne(id: string) {
    return this.em.getRepository(Product).findOneOrFail({ id }, ["category"]);
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
  }: CreateProductDto) {
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
