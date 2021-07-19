import React, { useRef, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { faUser, faMapMarkedAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";

import IconInput from "../widgets/IconInput";
import HOST from "../../constants/host";
import getCartItems from "../../queries/getCartItems";
import { CouponContext } from "../../providers/CouponContextProvider";

interface FormInput {
  name: string;
  address: string;
  phoneNumber: string;
}

const PaymentForm: React.FC = () => {
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const { coupon } = useContext(CouponContext);

  const { data: cartItems } = useQuery<CartItem[]>("cart", () => getCartItems());

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        address: yup.string().required(),
        phoneNumber: yup.string().phone("HK").required(),
      })
    ),
  });

  const pay = async ({ name, address, phoneNumber }: FormInput) => {
    errMsgRef.current.innerText = "";
    setIsPaying(true);

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      errMsgRef.current.innerText = "Error occured. Please try again";
      setIsPaying(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error || !paymentMethod) {
      errMsgRef.current.innerText = error.message;
      setIsPaying(false);
      return;
    }

    try {
      const res = await fetch(`${HOST}/charge`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          productIds: cartItems.map((cartItem) => cartItem.product.id),
          couponId: coupon?.id,
        }),
      });
      const data = await res.json();

      if (!res.ok) errMsgRef.current.innerText = data.message;

      setIsPaying(false);
    } catch (err) {
      console.log(err);
      setIsPaying(false);
      errMsgRef.current.innerText = err;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(pay)}>
        <IconInput
          name={"name"}
          placeholder={"Type your name"}
          icon={faUser}
          margin={"30px 0"}
          register={register}
          error={errors.name}
        />
        <IconInput
          name={"address"}
          placeholder={"Type your address"}
          icon={faMapMarkedAlt}
          margin={"30px 0"}
          register={register}
          error={errors.address}
        />
        <IconInput
          name={"phoneNumber"}
          label={"phone number"}
          inputType={"tel"}
          placeholder={"Type your phone number"}
          icon={faPhoneAlt}
          margin={"30px 0"}
          register={register}
          error={errors.phoneNumber}
        />
        <CardElement id="card-element" options={{ hidePostalCode: true }} />
        <button type="submit" className="pay-btn" disabled={isPaying}>
          Pay
        </button>
        <p className="err-msg" ref={errMsgRef} />
      </form>

      <style jsx>{`
        form {
          width: 45%;
          margin: 100px auto;
        }

        .pay-btn {
          margin: 30px auto;
          display: block;
          border: none;
          padding: 5px 15px;
          background: #5736f1;
          color: #fff;
          border-radius: 10px;
        }

        @media screen and (max-width: 700px) {
          form {
            width: 80%;
          }
        }
      `}</style>
    </>
  );
};

export default PaymentForm;
