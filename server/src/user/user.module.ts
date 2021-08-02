import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { CartController } from "./cart/cart.controller";
import { CartService } from "./cart/cart.service";
import { User } from "./entities/user.entity";
import { Product } from "../product/entities/product.entity";
import { UserInCartProducts } from "./entities/userInCartProducts.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { StripeModule } from "../stripe/stripe.module";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [MikroOrmModule.forFeature([User, Product, UserInCartProducts]), StripeModule, DatabaseModule],
  controllers: [CartController, UserController],
  providers: [CartService, UserService],
  exports: [CartService, UserService],
})
export class UserModule {}
