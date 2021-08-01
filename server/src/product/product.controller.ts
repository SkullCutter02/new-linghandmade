import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";

import { ProductService } from "./product.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { UpdateProductDto } from "./dto/updateProduct.dto";
import { CreateProductDto } from "./dto/createProduct.dto";
import { Product } from "./entities/product.entity";
import { PaginationDto } from "../shared/pagination.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/featured")
  async findFeatured(): Promise<Product[]> {
    return this.productService.findFeatured();
  }

  @Get("/:id")
  async findOne(@Param("id") id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Get()
  async find(
    @Query() paginationDto: PaginationDto,
    @Query("category") categoryId: string,
  ): Promise<{ products: Product[]; hasMore: boolean }> {
    return this.productService.find(paginationDto, categoryId);
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Patch("/:id")
  @UseGuards(AdminAuthGuard)
  async update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete("/:id")
  @UseGuards(AdminAuthGuard)
  async delete(@Param("id") id: string): Promise<Product> {
    return this.productService.delete(id);
  }
}
