import type { Order as BaseOrder } from "../../server/src/order/entities/order.entity";

interface Order extends BaseOrder {
  createdAt: string;
}
