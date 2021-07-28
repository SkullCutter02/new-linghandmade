import { Injectable } from "@nestjs/common";

import { UserRepository } from "./repositories/user.repository";
import { PaginationDto } from "../shared/pagination.dto";
import { StripeService } from "../stripe/stripe.service";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly stripeService: StripeService,
  ) {}

  async find({ page, limit, filter }: PaginationDto) {
    const [users, count] = await this.userRepository.findAndCount(
      { email: { $ilike: `%${filter}%` } },
      { limit, offset: (page - 1) * limit },
    );
    return { users, hasMore: count > page * limit };
  }

  async create(username: string, email: string, hash: string) {
    const { id: stripeCustomerId } = await this.stripeService.createCustomer(username, email);
    const user = this.userRepository.create({ username, email, hash, stripeCustomerId });

    await this.userRepository.persistAndFlush(user);
    return user;
  }
}
