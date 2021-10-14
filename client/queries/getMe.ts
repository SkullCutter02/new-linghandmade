import { GetServerSidePropsContext } from "next";

import HOST from "../constants/host";

const getMe = async (ctx?: GetServerSidePropsContext) => {
  const res = await fetch(`${HOST}/auth/me`, {
    credentials: "include",
    headers: ctx?.req ? { cookie: ctx.req.headers.cookie } : undefined,
  });
  return await res.json();
};

export default getMe;
