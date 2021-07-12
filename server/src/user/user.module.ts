import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { Product } from "../product/entities/product.entity";
import { UserInCartProducts } from "./entities/userInCartProducts.entity";

@Module({
  imports: [MikroOrmModule.forFeature([User, Product, UserInCartProducts])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
