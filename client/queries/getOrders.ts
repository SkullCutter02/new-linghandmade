import HOST from "../constants/host";
import { GetServerSidePropsContext } from "next";

const getOrders = async (ctx?: GetServerSidePropsContext) => {
  const res = await fetch(`${HOST}/user/order`, {
    credentials: "include",
    headers: ctx?.req ? { cookie: ctx.req.headers.cookie } : undefined,
  });
  return res.json();
};

export default getOrders;
