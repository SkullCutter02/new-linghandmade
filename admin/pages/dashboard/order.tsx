import React, { useState } from "react";
import { Table, Thead, Tbody, Th, Td, Tr, Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import getOrders from "../../queries/getOrders";
import DashboardHeader from "../../components/DashboardHeader";
import PaginationButtons from "../../components/PaginationButtons";
import formatDate from "../../utils/formatDate";
import { Order } from "../../types/order";

const OrderDashboardPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const { isLoading, data: ordersData } = useQuery<{ orders: Order[]; hasMore: boolean }>(
    ["orders", page, filter],
    () => getOrders(page, filter)
  );

  return (
    <>
      <DashboardHeader filter={filter} setFilter={setFilter} />
      <Table variant={"simple"} size={"sm"}>
        <Thead>
          <Tr>
            <Th>order date</Th>
            <Th>name</Th>
            <Th>address</Th>
            <Th>phone number</Th>
            <Th>email</Th>
            <Th>ordered items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Spinner />
          ) : (
            ordersData.orders.map((order) => (
              <Tr key={order.id}>
                <Td>{formatDate(order.createdAt.toString())}</Td>
                <Td>{order.name}</Td>
                <Td>{order.address}</Td>
                <Td>{order.phoneNumber}</Td>
                <Td>{order.email}</Td>
                <Td>
                  {order.orderItems.map((orderItem) => (
                    <p key={orderItem}>
                      {orderItem}
                      <br />
                      <br />
                    </p>
                  ))}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <PaginationButtons hasMore={ordersData?.hasMore} page={page} setPage={setPage} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["orders", 1, ""], () => getOrders(1, "", ctx));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default OrderDashboardPage;
