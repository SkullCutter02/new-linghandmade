import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Table, Th, Tr, Thead, Tbody, Td, Spinner } from "@chakra-ui/react";

import getUsers from "../../queries/getUsers";
import DashboardHeader from "../../components/DashboardHeader";
import PaginationButtons from "../../components/PaginationButtons";

const UserDashboardPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const { isLoading, data: usersData } = useQuery<{ users: User[]; hasMore: boolean }>(
    ["users", page, filter],
    () => getUsers(page, filter)
  );

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <>
      <DashboardHeader filter={filter} setFilter={setFilter} />
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th>username</Th>
            <Th>email</Th>
            <Th>created at</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Spinner />
          ) : (
            usersData?.users?.map((user) => (
              <Tr key={user.id}>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.createdAt}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <PaginationButtons hasMore={usersData?.hasMore} page={page} setPage={setPage} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["users", 1, ""], () => getUsers(1, ""));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserDashboardPage;
