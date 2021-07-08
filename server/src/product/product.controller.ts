import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { ProductService } from "./product.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { CreateProductDto } from "./dto/createProduct.dto";
import { Product } from "./entities/product.entity";
import { PaginationDto } from "../shared/pagination.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/:id")
  async findOne(@Param("id") id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Get()
  async find(@Query() paginationDto: PaginationDto): Promise<Product[]> {
    return this.productService.find(paginationDto);
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }
}
