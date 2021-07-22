import React, { useState, useRef } from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import getCoupon from "../../../../queries/getCoupon";
import couponYupResolver from "../../../../resolvers/couponYupResolver";
import FormContainerTemplate from "../../../../components/templates/FormContainerTemplate";
import CouponFormTemplate from "../../../../components/templates/CouponFormTemplate";
import HOST from "../../../../constants/host";

const EditCouponPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const router = useRouter();
  const { couponId } = router.query;

  const { data: coupon } = useQuery<Coupon>(["coupon", couponId], () =>
    getCoupon(couponId as string)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormInput>({
    mode: "onBlur",
    resolver: couponYupResolver,
    defaultValues: {
      discount: coupon.discount,
      remarks: coupon?.remarks,
    },
  });

  const editCoupon = async ({ discount, remarks }: CouponFormInput) => {
    setIsLoading(true);
    errMsgRef.current.innerText = "";

    try {
      const res = await fetch(`${HOST}/coupon/${coupon.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discount, remarks }),
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
        submitFn={editCoupon}
        heading={"Edit Coupon"}
        buttonText={"Update"}
        isLoading={isLoading}
        errMsgRef={errMsgRef}
      >
        <CouponFormTemplate errors={errors} register={register} />
      </FormContainerTemplate>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const { couponId } = ctx.query;

  await queryClient.prefetchQuery(["coupon", couponId], () => getCoupon(couponId as string, ctx));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default EditCouponPage;
