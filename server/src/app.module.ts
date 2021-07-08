import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { EmailModule } from "./email/email.module";
import { CategoryModule } from "./category/category.module";
import { ProductModule } from "./product/product.module";
import ormconfig from "./config/ormconfig";

@Module({
  imports: [MikroOrmModule.forRoot(ormconfig), AuthModule, EmailModule, CategoryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
