import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Category } from "../category/entities/category.entity";
import { Product } from "./entities/product.entity";
import { Coupon } from "../coupon/entities/coupon.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [MikroOrmModule.forFeature([Product, Category, Coupon]), UserModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
