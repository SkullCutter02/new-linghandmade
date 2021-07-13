import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { CartController } from "./cart/cart.controller";
import { CartService } from "./cart/cart.service";
import { User } from "./entities/user.entity";
import { Product } from "../product/entities/product.entity";
import { UserInCartProducts } from "./entities/userInCartProducts.entity";

@Module({
  imports: [MikroOrmModule.forFeature([User, Product, UserInCartProducts])],
  controllers: [CartController],
  providers: [CartService],
})
export class UserModule {}
