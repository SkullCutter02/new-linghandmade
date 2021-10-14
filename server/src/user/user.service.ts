import { Injectable } from "@nestjs/common";

import { UserRepository } from "./repositories/user.repository";
import { PaginationDto } from "../shared/pagination.dto";
import { StripeService } from "../stripe/stripe.service";
import { DatabaseService } from "../database/database.service";
import { OrderService } from "../order/order.service";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderService: OrderService,
    private readonly stripeService: StripeService,
    private readonly databaseService: DatabaseService,
  ) {}

  async find({ page, limit, filter }: PaginationDto) {
    if (!filter) {
      const [users, count] = await this.userRepository.findAndCount(
        { email: { $ilike: `%${filter}%` } },
        { limit, offset: (page - 1) * limit },
      );
      return { users, hasMore: count > page * limit };
    } else {
      const [users, count] = await this.databaseService.fullTextSearch(User, page, limit, filter, [
        "username",
        "email",
      ]);
      return { users, hasMore: count > page * limit };
    }
  }

  async create(username: string, email: string, hash: string) {
    const { id: stripeCustomerId } = await this.stripeService.createCustomer(username, email);
    const user = this.userRepository.create({ username, email, hash, stripeCustomerId });

    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async getOrders(user: User) {
    return this.orderService.findByUser(user);
  }
}
