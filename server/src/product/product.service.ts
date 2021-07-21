import { Injectable } from "@nestjs/common";

import { CreateProductDto } from "./dto/createProduct.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";
import { Product } from "./entities/product.entity";
import { PaginationDto } from "../shared/pagination.dto";
import { ProductRepository } from "./repositories/product.repository";
import { CategoryRepository } from "../category/repositories/category.repository";
import { CouponRepository } from "../coupon/repositories/coupon.repository";
import { CartService } from "../user/cart/cart.service";

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly couponRepository: CouponRepository,
    private readonly cartService: CartService,
  ) {}

  async findFeatured(): Promise<Product[]> {
    return this.productRepository.find({ featured: true }, { limit: 3, populate: ["category"] });
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOneOrFail({ id }, ["category"]);
  }

  async find(
    { filter, page, limit }: PaginationDto,
    categoryId: string,
  ): Promise<{ products: Product[]; hasMore: boolean }> {
    const category = await this.categoryRepository.findOne({ id: categoryId });

    if (!category) {
      const [products, count] = await this.productRepository.findAndCount(
        { name: { $ilike: `%${filter}%` } },
        { limit, offset: (page - 1) * limit, populate: ["category"] },
      );
      return { products, hasMore: count > page * limit };
    } else {
      const [products, count] = await this.productRepository.findAndCount(
        { name: { $ilike: `%${filter}%` }, category },
        { limit, offset: (page - 1) * limit, populate: ["category"] },
      );
      return { products, hasMore: count > page * limit };
    }
  }

  async create({
    name,
    description,
    price,
    discount,
    mainImgUrl,
    carouselImgUrls,
    amtLeft,
    featured,
    remarks,
    categoryId,
  }: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findOneOrFail({ id: categoryId });
    const product = this.productRepository.create({
      name,
      description,
      price,
      discount,
      mainImgUrl,
      carouselImgUrls,
      amtLeft,
      featured,
      remarks,
      category,
    });

    await this.productRepository.persistAndFlush(product);
    return product;
  }

  async update(
    id: string,
    {
      name,
      description,
      price,
      discount,
      mainImgUrl,
      carouselImgUrls,
      amtLeft,
      featured,
      remarks,
      categoryId,
    }: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOneOrFail({ id });
    const category = categoryId ? await this.categoryRepository.findOneOrFail({ id: categoryId }) : null;

    product.assign({
      name,
      description,
      price,
      discount,
      mainImgUrl,
      carouselImgUrls,
      amtLeft,
      featured,
      remarks,
      category,
    });

    await this.productRepository.persistAndFlush(product);
    return product;
  }

  async delete(id: string): Promise<Product> {
    const product = await this.productRepository.findOneOrFail({ id });

    await this.productRepository.removeAndFlush(product);
    return product;
  }

  async getPrice(userId: string, couponId?: string) {
    const cartItems = await this.cartService.getCartItems(userId);
    const coupon = await this.couponRepository.findOne({ id: couponId });

    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
      total +=
        cartItems[i].amount * (cartItems[i].product.price * ((100 - cartItems[i].product.discount) / 100));
    }

    if (coupon) total *= (100 - coupon.discount) / 100;

    return total;
  }

  async reduceProductsAmount(userId: string) {
    const cartItems = await this.cartService.getCartItems(userId);

    for (let i = 0; i < cartItems.length; i++) {
      await this.productRepository.reduceAmount(cartItems[i].product.id, cartItems[i].amount);
    }
  }
}
