import React from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import UserProfile from "../../components/ui/user/UserProfile";
import getMe from "../../queries/getMe";
import { User } from "../../types/user";

const UserPage: React.FC = () => {
  const { data: user } = useQuery<User>("user", () => getMe());

  return (
    <>
      <main className="user-container">
        <UserProfile user={user} />
      </main>

      <style jsx>{`
        .user-container {
          max-height: calc(100vh - var(--navbarHeight));
          padding: 60px 6%;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("user", () => getMe(ctx));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserPage;
