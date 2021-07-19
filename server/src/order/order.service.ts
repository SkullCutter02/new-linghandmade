import { Injectable } from "@nestjs/common";

import { OrderRepository } from "./repositories/order.repository";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { CartService } from "../user/cart/cart.service";
import { UserInCartProducts } from "../user/entities/userInCartProducts.entity";

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository, private readonly cartService: CartService) {}

  async create({ name, address, phoneNumber }: CreateOrderDto, userId: string) {
    const cartItems = await this.cartService.getCartItems(userId);

    const order = this.orderRepository.create({
      name,
      address,
      phoneNumber,
      orderItems: cartItems
        .toArray()
        .map((cartItem: UserInCartProducts) => `${cartItem.product.name} x${cartItem.amount}`),
    });

    await this.orderRepository.persistAndFlush(order);
    return order;
  }
}
