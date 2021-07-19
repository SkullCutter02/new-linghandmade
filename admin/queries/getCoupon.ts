import HOST from "../constants/host";
import { GetServerSidePropsContext } from "next";

const getCoupon = async (couponId: string, ctx?: GetServerSidePropsContext) => {
  const res = await fetch(`${HOST}/coupon/${couponId}`, {
    credentials: "include",
    headers: ctx?.req ? { cookie: ctx.req.headers.cookie } : undefined,
  });
  return await res.json();
};

export default getCoupon;
