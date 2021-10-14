import React from "react";
import { useQuery } from "react-query";

import getOrders from "../../../queries/getOrders";
import { Order } from "../../../types/order";
import { format, parseISO } from "date-fns";

const OrderHistory: React.FC = () => {
  const { data: orders } = useQuery<Order[]>("orders", () => getOrders());

  return (
    <>
      <div className="orders">
        <h1>Order History</h1>
        {orders.map((order) => (
          <div className="order" key={order.id}>
            <p>Order Date: {format(parseISO(order.createdAt), "MMM. d, yyyy")}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderHistory;
