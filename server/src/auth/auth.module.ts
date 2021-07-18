import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { User } from "../user/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { cookieOptions } from "./config/cookieOptions";
import { EmailService } from "../email/email.service";
import { ResetEmail } from "./entities/resetEmail.entity";
import { StripeService } from "../stripe/stripe.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    MikroOrmModule.forFeature([User, ResetEmail]),
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: cookieOptions.maxAge },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, StripeService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
