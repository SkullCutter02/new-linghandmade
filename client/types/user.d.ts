import type { User as BaseUser } from "../../server/src/user/entities/user.entity";

interface User extends BaseUser {
  createdAt: string;
}
