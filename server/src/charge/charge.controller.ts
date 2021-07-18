import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request } from "express";

import { StripeService } from "../stripe/stripe.service";
import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";
import { CreateChargeDto } from "./dto/createCharge.dto";
import { User } from "../user/entities/user.entity";

@Controller("charge")
export class ChargeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createCharge(@Req() req: Request, @Body() { amount, paymentMethodId }: CreateChargeDto) {
    return await this.stripeService.charge(amount, paymentMethodId, (req.user as User).stripeCustomerId);
  }
}
