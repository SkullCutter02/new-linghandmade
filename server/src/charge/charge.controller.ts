import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";
import { CreateChargeDto } from "./dto/createCharge.dto";
import { User } from "../user/entities/user.entity";
import { CreateOrderDto } from "../order/dto/createOrder.dto";
import { ChargeService } from "./charge.service";

@Controller("charge")
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCharge(
    @Req() req: Request,
    @Body() createChargeDto: CreateChargeDto,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.chargeService.createCharge(req.user as User, createChargeDto, createOrderDto);
  }
}
