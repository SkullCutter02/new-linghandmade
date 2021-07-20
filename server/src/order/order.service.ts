import { Injectable } from "@nestjs/common";

import { OrderRepository } from "./repositories/order.repository";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { CartService } from "../user/cart/cart.service";
import { UserInCartProducts } from "../user/entities/userInCartProducts.entity";
import { User } from "../user/entities/user.entity";
import { PaginationDto } from "../shared/pagination.dto";

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository, private readonly cartService: CartService) {}

  async find({ page, limit, filter }: PaginationDto) {
    return this.orderRepository.find(
      { name: { $ilike: `%${filter}%` } },
      { limit, offset: (page - 1) * limit },
    );
  }

  async create({ name, address, phoneNumber }: CreateOrderDto, user: User) {
    const cartItems = await this.cartService.getCartItems(user.id);

    const order = this.orderRepository.create({
      name,
      address,
      phoneNumber,
      email: user.email,
      orderItems: cartItems
        .toArray()
        .map((cartItem: UserInCartProducts) => `${cartItem.product.name} x${cartItem.amount}`),
    });

    await this.orderRepository.persistAndFlush(order);
    return order;
  }
}
