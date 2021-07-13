import React from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

import getCartItems from "../../queries/getCartItems";

const CartPage: React.FC = () => {
  const { data: cartItems } = useQuery<CartItem[]>("cart", () => getCartItems());

  const getTotalPrice = () => {
    let price = 0;

    cartItems.forEach((cartItem) => (price += cartItem.amount * cartItem.product.price));

    return price;
  };

  return (
    <>
      <main>
        <div className="cart-items-container">
          {cartItems.map(({ product, amount }) => (
            <div className="cart-item-container" key={product.id + amount}>
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
              <FontAwesomeIcon
                icon={faTimesCircle}
                style={{ cursor: "pointer", color: "#c4c4c4" }}
              />
            </div>
          ))}
          <div className="cart-item-container total-price-container">
            <p className="total">Total</p>
            <p className="total-price">${getTotalPrice().toFixed(2)}</p>
          </div>
        </div>
        <div className="buttons">
          <button className="continue-shopping-btn">Continue Shopping</button>
          <button className="checkout-btn">Checkout Now</button>
        </div>
      </main>

      <style jsx>{`
        main {
          width: 75%;
          margin: 50px auto;
        }

        .cart-items-container {
          width: 100%;
          background: #f1f5f6;
          border-radius: 5px;
          padding: 20px;
        }

        .cart-item-container {
          display: grid;
          grid-template-columns: 0.8fr 1fr 0.4fr 0.4fr 0.2fr;
          grid-column-gap: 30px;
          justify-items: center;
          align-items: center;
          margin-bottom: 30px;
          height: 170px;
          padding-bottom: 30px;
          border-bottom: 1px solid #e5e5e5;
        }

        .cart-item-container:last-child {
          margin-bottom: 10px;
          border-bottom: none;
          height: 140px;
          padding-bottom: 0;
        }

        .cart-item-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }

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

        .total-price-container {
          height: 30px !important;
          font-size: 18px;
          font-weight: 500;
        }

        .total-price-container .total {
          grid-column-start: 3;
        }

        .total-price-container .total-price {
          color: var(--primaryColor);
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 35px;
          margin-bottom: 60px;
        }

        .buttons button {
          border: none;
          color: #fff;
          padding: 12px 18px;
          border-radius: 2px;
        }

        .continue-shopping-btn {
          background: var(--tertiaryColor);
        }

        .checkout-btn {
          background: var(--primaryColor);
        }

        @media screen and (max-width: 950px) {
          main {
            width: 90%;
          }
        }

        @media screen and (max-width: 700px) {
          .cart-item-container:not(.total-price-container) {
            overflow-x: scroll;
          }

          .cart-item-container > * {
            min-width: 150px;
          }
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("cart", () => getCartItems(ctx));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CartPage;
