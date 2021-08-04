import type { User as BaseUser } from "../../client/types/user";

interface User extends BaseUser {
  username: string;
  email: string;
}
