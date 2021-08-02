import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/postgresql";

import { OrderRepository } from "./repositories/order.repository";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { CartService } from "../user/cart/cart.service";
import { UserInCartProducts } from "../user/entities/userInCartProducts.entity";
import { User } from "../user/entities/user.entity";
import { PaginationDto } from "../shared/pagination.dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartService: CartService,
    private readonly em: EntityManager,
  ) {}

  async find({ page, limit, filter }: PaginationDto) {
    if (!filter) {
      const [orders, count] = await this.orderRepository.findAndCount(
        { name: { $ilike: `%${filter}%` } },
        { limit, offset: (page - 1) * limit, orderBy: { createdAt: "ASC" } },
      );
      return { orders, hasMore: count > page * limit };
    } else {
      const orders = await this.em
        .createQueryBuilder(Order)
        .select("*")
        .where(
          "to_tsvector(name || ' ' || address || ' ' || email || ' ' || phone_number) @@ plainto_tsquery(?)",
          [filter],
        )
        .limit(limit)
        .offset((page - 1) * limit)
        .execute("all");
      const count = await this.em
        .createQueryBuilder(Order)
        .select("*")
        .where(
          "to_tsvector(name || ' ' || address || ' ' || email || ' ' || phone_number) @@ plainto_tsquery(?)",
          [filter],
        )
        .count()
        .execute();
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
