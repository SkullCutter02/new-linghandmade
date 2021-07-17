import { Injectable } from "@nestjs/common";

import { UserRepository } from "./repositories/user.repository";
import { PaginationDto } from "../shared/pagination.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async find({ page, limit, filter }: PaginationDto) {
    const [users, count] = await this.userRepository.findAndCount(
      { email: { $ilike: `%${filter}%` } },
      { limit, offset: (page - 1) * limit },
    );
    return { users, hasMore: count > page * limit };
  }
}
