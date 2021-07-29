import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import HOST from "../../../constants/host";
import toastOptions from "../../../config/toastOptions";
import UndoToast from "../../widgets/UndoToast";

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
    }, 900);

    return () => clearTimeout(timeoutId);
  }, [productAmount]);

  const restoreCartItem = async () => {
    const res = await fetch(`${HOST}/user/cart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        amount: amount,
      }),
    });
    const data = await res.json();

    queryClient.setQueryData("cart", data.userInCartProducts);
  };

  const removeCartItem = async () => {
    try {
      const res = await fetch(`${HOST}/user/cart`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();

      queryClient.setQueryData("cart", data);

      toast.success(<UndoToast onUndo={restoreCartItem} />, {
        ...toastOptions,
        closeOnClick: false,
        closeButton: false,
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again", toastOptions);
    }
  };

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
        <p>
          <span className={!!product.discount ? "discounted" : ""}>
            ${(product.price * productAmount).toFixed(2)}
          </span>
          {!!product.discount && (
            <span className="discount" style={{ marginLeft: "6px" }}>
              ${((productAmount * (product.price * (100 - product.discount))) / 100).toFixed(2)}
            </span>
          )}
        </p>
        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{ cursor: "pointer", color: "#c4c4c4" }}
          onClick={removeCartItem}
        />
        {amount > product.amtLeft && (
          <p className="err-msg">
            Warning: This product only has {product.amtLeft} items left. Please adjust the amount of
            items you want for this product
          </p>
        )}
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

        .err-msg {
          grid-row-start: 2;
          grid-column-start: 1;
          grid-column-end: 6;
          margin-top: 30px;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default CartItem;
