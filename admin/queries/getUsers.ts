import HOST from "../constants/host";
import { GetServerSidePropsContext } from "next";

const getUsers = async (page: number, filter: string, ctx?: GetServerSidePropsContext) => {
  const res = await fetch(`${HOST}/user?page=${page}&limit=30&filter=${filter}`, {
    credentials: "include",
    headers: ctx?.req ? { cookie: ctx.req.headers.cookie } : undefined,
  });
  return await res.json();
};

export default getUsers;
