import { Injectable } from "@nestjs/common";

import { OrderRepository } from "./repositories/order.repository";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { CartService } from "../user/cart/cart.service";
import { DatabaseService } from "../database/database.service";
import { UserInCartProducts } from "../user/entities/userInCartProducts.entity";
import { User } from "../user/entities/user.entity";
import { PaginationDto } from "../shared/pagination.dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartService: CartService,
    private readonly databaseService: DatabaseService,
  ) {}

  async find({ page, limit, filter }: PaginationDto) {
    if (!filter) {
      const [orders, count] = await this.orderRepository.findAndCount(
        { name: { $ilike: `%${filter}%` } },
        { limit, offset: (page - 1) * limit, orderBy: { createdAt: "ASC" } },
      );
      return { orders, hasMore: count > page * limit };
    } else {
      const [orders, count] = await this.databaseService.fullTextSearch(Order, page, limit, filter, [
        "name",
        "email",
        "phone_number",
        "address",
      ]);
      return { orders, hasMore: count > page * limit };
    }
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
      user,
    });

    await this.orderRepository.persistAndFlush(order);
    return order;
  }
}
