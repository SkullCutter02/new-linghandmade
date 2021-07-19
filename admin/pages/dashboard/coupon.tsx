import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import getCoupons from "../../queries/getCoupons";
import PaginationButtons from "../../components/PaginationButtons";
import DashboardHeader from "../../components/DashboardHeader";

const CouponDashboardPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const { isLoading, data: couponsData } = useQuery<{ coupons: Coupon[]; hasMore: boolean }>(
    ["coupons", page, filter],
    () => getCoupons(page, filter)
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
            <Th>code</Th>
            <Th>discount</Th>
            <Th>created at</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Spinner />
          ) : (
            couponsData.coupons
              .filter((coupon) => !coupon.used)
              .map((coupon) => (
                <Tr key={coupon.id}>
                  <Td>{coupon.code}</Td>
                  <Td>{coupon.discount}</Td>
                  <Td>{coupon.createdAt}</Td>
                  <Td>
                    <FontAwesomeIcon icon={faPencilAlt} style={{ cursor: "pointer" }} />
                  </Td>
                  <Td>
                    <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: "pointer" }} />
                  </Td>
                </Tr>
              ))
          )}
        </Tbody>
      </Table>
      <PaginationButtons hasMore={couponsData?.hasMore} page={page} setPage={setPage} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["coupons", 1, ""], () => getCoupons(1, "", ctx));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CouponDashboardPage;
