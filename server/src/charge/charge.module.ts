import { Module } from "@nestjs/common";
import { ChargeController } from "./charge.controller";
import { StripeService } from "../stripe/stripe.service";

@Module({
  controllers: [ChargeController],
  providers: [StripeService],
})
export class ChargeModule {}
