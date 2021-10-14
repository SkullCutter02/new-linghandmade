import React, { useRef, useState, useContext } from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import Link from "next/link";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import getCartItems from "../../queries/getCartItems";
import CartItem from "../../components/ui/cart/CartItem";
import IconInput from "../../components/widgets/IconInput";
import HOST from "../../constants/host";
import { CouponContext } from "../../context/CouponContextProvider";
import { CartItem as ICartItem } from "../../types/cartItem";

const CartPage: React.FC = () => {
  const [isGettingCoupon, setIsGettingCoupon] = useState<boolean>(false);

  const { coupon, setCoupon } = useContext(CouponContext);

  const { data: cartItems } = useQuery<ICartItem[]>("cart", () => getCartItems());

  const couponInputRef = useRef<HTMLInputElement>(null);
  const couponErrMsgRef = useRef<HTMLParagraphElement>(null);

  const getTotalPrice = (includeDiscount: boolean = false) => {
    let price = 0;

    cartItems.forEach((cartItem) => {
      if (!cartItem.product.discount) price += cartItem.amount * cartItem.product.price;
      else
        price +=
          cartItem.amount * ((cartItem.product.price * (100 - cartItem.product.discount)) / 100);
    });

    if (coupon && includeDiscount) return price * ((100 - coupon.discount) / 100);

    return price;
  };

  const applyCoupon = async () => {
    setIsGettingCoupon(true);
    couponErrMsgRef.current.innerText = "";

    try {
      const res = await fetch(`${HOST}/coupon/code?code=${couponInputRef.current.value}`);
      const data = await res.json();

      if (res.ok) {
        setCoupon(data);
        couponInputRef.current.value = "";
      } else couponErrMsgRef.current.innerText = data.message;

      setIsGettingCoupon(false);
    } catch (err) {
      console.log(err);
      setIsGettingCoupon(false);
      couponErrMsgRef.current.innerText = err;
    }
  };

  return (
    <>
      <main>
        <div className="cart-items-container">
          {(cartItems && cartItems.length === 0) ||
            cartItems
              .sort((a, b) => a.product.name.localeCompare(b.product.name))
              .map((cartItem) => <CartItem cartItem={cartItem} key={cartItem.product.id} />)}
          <div className="cart-item-container total-price-container">
            <p className="total">Total</p>
            <span>
              <p className={coupon ? "discounted" : "total-price"}>
                ${getTotalPrice().toFixed(2)}{" "}
              </p>
              {coupon && <span className="total-price">${getTotalPrice(true).toFixed(2)}</span>}
            </span>
          </div>
        </div>
        <div className="coupon-container">
          <IconInput
            name={""}
            inputRef={couponInputRef}
            icon={faTag}
            placeholder={"Enter Coupon Code"}
          />
          <button className="coupon-btn" disabled={isGettingCoupon} onClick={applyCoupon}>
            Apply
          </button>
          {coupon && (
            <p className="coupon-active">
              Coupon active. <span onClick={() => setCoupon(null)}>Remove coupon?</span>
            </p>
          )}
        </div>
        <p className="err-msg" ref={couponErrMsgRef} />
        <div className="buttons">
          <Link href={"/products?page=1&filter="}>
            <button className="continue-shopping-btn">Continue Shopping</button>
          </Link>
          <Link href={"/cart/checkout"}>
            <button className="checkout-btn" disabled={cartItems.length === 0}>
              Checkout Now
            </button>
          </Link>
        </div>
      </main>

      <style jsx>{`
        main {
          width: 80%;
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
          min-height: 0 !important;
          font-size: 18px;
          font-weight: 500;
        }

        .total-price-container .total {
          grid-column-start: 3;
        }

        .total-price-container .total-price {
          color: var(--primaryColor);
        }

        .coupon-container {
          display: flex;
          width: 100%;
          align-items: center;
          margin: 30px 0;
        }

        .coupon-btn {
          margin-left: 25px;
          padding: 5px 8px;
          border: none;
          border-radius: 4px;
          background: var(--secondaryColor);
          color: #fff;
        }

        .coupon-btn:disabled {
          background: #d4c3a4;
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

        .coupon-active {
          font-size: 0.75rem;
          margin-left: 10px;
          font-weight: initial;
        }

        .coupon-active span {
          text-decoration: underline;
          cursor: pointer;
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
