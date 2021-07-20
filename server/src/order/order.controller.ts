import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { OrderService } from "./order.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { PaginationDto } from "../shared/pagination.dto";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(AdminAuthGuard)
  async find(@Query() paginationDto: PaginationDto) {
    return this.orderService.find(paginationDto);
  }
}
