import React from "react";
import { useQuery } from "react-query";

import getOrders from "../../../queries/getOrders";
import { Order } from "../../../types/order";
import OrderHistory from "./OrderHistory";

const OrderHistories: React.FC = () => {
  const { data: orders } = useQuery<Order[]>("orders", () => getOrders());

  return (
    <>
      <div className="orders">
        <h1>Order History</h1>
        {orders.map((order) => (
          <OrderHistory order={order} key={order.id} />
        ))}
      </div>
    </>
  );
};

export default OrderHistories;
