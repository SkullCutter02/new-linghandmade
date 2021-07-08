import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";

import { ProductService } from "./product.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { CreateProductDto } from "./dto/createProduct.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}
