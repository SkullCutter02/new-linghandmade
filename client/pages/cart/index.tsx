import React from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import getCartItems from "../../queries/getCartItems";
import CartItem from "../../components/ui/cart/CartItem";

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
          {cartItems
            .sort((a, b) => a.product.name.localeCompare(b.product.name))
            .map((cartItem) => (
              <CartItem cartItem={cartItem} />
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
