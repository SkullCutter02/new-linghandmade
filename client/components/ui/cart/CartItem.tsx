import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import HOST from "../../../constants/host";
import toastOptions from "../../../config/toastOptions";

interface Props {
  cartItem: CartItem;
}

const CartItem: React.FC<Props> = ({ cartItem: { product, amount } }) => {
  const [productAmount, setProductAmount] = useState<number>(amount);

  const queryClient = useQueryClient();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`${HOST}/user/cart`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            amount: productAmount,
          }),
        });
        const data = await res.json();

        queryClient.setQueryData("cart", data.userInCartProducts);
      } catch (err) {
        console.log(err);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [productAmount]);

  return (
    <>
      <div className="cart-item-container">
        <img src={product.mainImgUrl} alt={product.name} />
        <div className="text-content">
          <p>{product.name}</p>
          <p className="description">{product.description}</p>
        </div>
        <div className="amount">
          <span
            onClick={() => {
              if (productAmount > 1) setProductAmount((prev) => prev - 1);
              else toast.error("You must have at least one item!", toastOptions);
            }}
          >
            -
          </span>
          <p className="amount">{productAmount}</p>
          <span
            onClick={() => {
              if (productAmount < product.amtLeft) setProductAmount((prev) => prev + 1);
              else toast.error("Item has no more left!", toastOptions);
            }}
          >
            +
          </span>
        </div>
        <p>${(product.price * productAmount).toFixed(2)}</p>
        <FontAwesomeIcon icon={faTimesCircle} style={{ cursor: "pointer", color: "#c4c4c4" }} />
      </div>

      <style jsx>{`
        .text-content {
          width: 100%;
          overflow: hidden;
        }

        .description {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          font-size: 0.8rem;
          margin-top: 5px;
          color: var(--secondaryTextColor);
        }

        .amount {
          display: flex;
        }

        .amount span {
          margin: 0 10px;
          cursor: pointer;
        }

        .amount * {
          font-weight: 300;
          color: #919191;
        }
      `}</style>
    </>
  );
};

export default CartItem;
