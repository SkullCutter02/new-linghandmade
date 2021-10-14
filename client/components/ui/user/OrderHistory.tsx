import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { Order } from "../../../types/order";

interface Props {
  order: Order;
}

const OrderHistory: React.FC<Props> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <div className="order">
        <div className="order-information">
          <div>
            <p>
              <strong>Ordered Items:</strong>
            </p>
            <ul className="order-items">
              {order.orderItems.map((orderItem) => (
                <li className="order-item" key={orderItem}>
                  {orderItem}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p>
              <strong>Order Date:</strong> {format(parseISO(order.createdAt), "MMM. d, yyyy")}
            </p>
            <p>
              <strong>Price:</strong> {order.price}HKD
            </p>
            <p>
              <strong>Coupon Code:</strong> {order.couponCode || "No coupon applied"}
            </p>
          </div>
        </div>
        <div className="order-extra-information">
          <p className="more-information-caret" onClick={() => setIsExpanded((prev) => !prev)}>
            <FontAwesomeIcon
              icon={faCaretRight}
              style={{
                transition: "all 0.2s",
                transform: isExpanded ? "rotate(90deg)" : "rotate(0)",
                marginRight: "10px",
              }}
            />
            More Information
          </p>
          <div>
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Phone Number:</strong> {order.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .order {
          width: 100%;
          border-radius: 4px;
          background: #f6f8fa;
          border: 2px solid #f2f4f5;
          padding: 10px 20px;
          margin-top: 30px;
        }

        .order-information {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 20px;
        }

        .order p {
          margin: 5px 0;
        }

        ul {
          list-style: circle;
          margin-left: 40px;
        }

        .order-extra-information {
          margin-top: 40px;
        }

        .more-information-caret {
          cursor: pointer;
          font-size: 0.9rem;
          display: inline;
        }

        .order-extra-information * {
          font-size: 0.9rem;
        }

        .order-extra-information > div {
          margin-top: 10px;
          transition: all 0.5s ease-in-out;
          overflow: hidden;
          max-height: ${isExpanded ? "10em" : "0"};
          margin-left: 15px;
        }
      `}</style>
    </>
  );
};

export default OrderHistory;
