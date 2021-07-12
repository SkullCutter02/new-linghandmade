import HOST from "../constants/host";
import { GetServerSidePropsContext } from "next";

const getCartItems = async (ctx?: GetServerSidePropsContext) => {
  const res = await fetch(`${HOST}/user/cart`, {
    credentials: "include",
    headers: ctx?.req ? { cookie: ctx.req.headers.cookie } : undefined,
  });
  return await res.json();
};

export default getCartItems;
