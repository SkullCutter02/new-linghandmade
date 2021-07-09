import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Category } from "../category/entities/category.entity";
import { Product } from "./entities/product.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Category, Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
