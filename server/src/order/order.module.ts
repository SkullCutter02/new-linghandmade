import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { OrderService } from "./order.service";
import { Order } from "./entities/order.entity";
import { UserModule } from "../user/user.module";
import { OrderController } from "./order.controller";

@Module({
  imports: [MikroOrmModule.forFeature([Order]), UserModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
