import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import FormContainerTemplate from "../../../components/templates/FormContainerTemplate";
import CouponFormTemplate from "../../../components/templates/CouponFormTemplate";
import couponYupResolver from "../../../resolvers/couponYupResolver";
import HOST from "../../../constants/host";

const CreateCouponPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormInput>({
    mode: "onBlur",
    resolver: couponYupResolver,
  });

  const createCoupon = async ({ discount }: CouponFormInput) => {
    setIsLoading(true);
    errMsgRef.current.innerText = "";

    try {
      const res = await fetch(`${HOST}/coupon`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discount }),
      });
      const data = await res.json();

      if (res.ok) await router.push("/dashboard/coupon");
      else {
        setIsLoading(false);
        errMsgRef.current.innerText = data.message;
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      errMsgRef.current.innerText = err;
    }
  };

  return (
    <>
      <FormContainerTemplate
        handleSubmit={handleSubmit}
        submitFn={createCoupon}
        heading={"Create Coupon"}
        buttonText={"Create"}
        isLoading={isLoading}
        errMsgRef={errMsgRef}
      >
        <CouponFormTemplate errors={errors} register={register} />
      </FormContainerTemplate>
    </>
  );
};

export default CreateCouponPage;
