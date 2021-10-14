import React from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import UserProfile from "../../components/ui/user/UserProfile";
import OrderHistory from "../../components/ui/user/OrderHistory";
import getMe from "../../queries/getMe";
import getOrders from "../../queries/getOrders";
import { User } from "../../types/user";

const UserPage: React.FC = () => {
  const { data: user } = useQuery<User>("user", () => getMe());

  return (
    <>
      <main className="user-container">
        <UserProfile user={user} />
        <OrderHistory />
      </main>

      <style jsx>{`
        .user-container {
          padding: 60px 6%;
          display: grid;
          grid-template-columns: 1fr 2.5fr;
          grid-column-gap: 40px;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("user", () => getMe(ctx));
  await queryClient.prefetchQuery("orders", () => getOrders(ctx));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserPage;
