import type { Order as BaseOrder } from "../../server/src/order/entities/order.entity";

import { User } from "./user";

interface Order extends BaseOrder {
  user: User;
}
