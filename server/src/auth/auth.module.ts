import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { User } from "./entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { cookieOptions } from "./utils/cookieOptions";
import { ConfigModule } from "@nestjs/config";
import { EmailService } from "../email/email.service";
import { ResetEmail } from "./entities/resetEmail.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([User, ResetEmail]),
    PassportModule,
    ConfigModule.forRoot(),
    EmailService,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: cookieOptions.maxAge },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
