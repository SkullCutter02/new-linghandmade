import { GetServerSidePropsContext } from "next";

import HOST from "../constants/host";

const getOrders = async (page: number, filter: string, ctx?: GetServerSidePropsContext) => {
  const res = await fetch(`${HOST}/order?page=${page}&limit=30&filter=${filter}`, {
    credentials: "include",
    headers: ctx?.req ? { cookie: ctx.req.headers.cookie } : undefined,
  });
  return await res.json();
};

export default getOrders;
