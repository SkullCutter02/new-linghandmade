import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

interface Props {
  cartItem: CartItem;
}

const CartItem: React.FC<Props> = ({ cartItem: { product, amount } }) => {
  return (
    <>
      <div className="cart-item-container">
        <img src={product.mainImgUrl} alt={product.name} />
        <div className="text-content">
          <p>{product.name}</p>
          <p className="description">{product.description}</p>
        </div>
        <div className="amount">
          <span>-</span>
          <p className="amount">{amount}</p>
          <span>+</span>
        </div>
        <p>${(product.price * amount).toFixed(2)}</p>
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
