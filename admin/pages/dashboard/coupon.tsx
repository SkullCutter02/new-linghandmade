import React, { useState, useEffect, useRef } from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import getCoupons from "../../queries/getCoupons";
import PaginationButtons from "../../components/PaginationButtons";
import DashboardHeader from "../../components/DashboardHeader";
import ConfirmModal from "../../components/ConfirmModal";
import HOST from "../../constants/host";
import formatDate from "../../utils/formatDate";
import { Coupon } from "../../types/coupon";

const CouponDashboardPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const { isLoading, data: couponsData } = useQuery<{ coupons: Coupon[]; hasMore: boolean }>(
    ["coupons", page, filter],
    () => getCoupons(page, filter)
  );

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const removeCoupon = async (couponId: string) => {
    setIsDeleteInProgress(true);

    try {
      const res = await fetch(`${HOST}/coupon/${couponId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        await queryClient.prefetchQuery(["coupons", page, filter]);
        setIsModalOpen(false);
      }

      setIsDeleteInProgress(false);
    } catch (err) {
      console.log(err);
      setIsDeleteInProgress(false);
    }
  };

  return (
    <>
      <DashboardHeader filter={filter} setFilter={setFilter} createPageLink={"/create/coupon"} />
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th>code</Th>
            <Th>discount</Th>
            <Th>updated at</Th>
            <Th>remarks</Th>
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
                  <Td>{formatDate(coupon.updatedAt.toString())}</Td>
                  <Td>{coupon?.remarks}</Td>
                  <Td>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      style={{ cursor: "pointer" }}
                      onClick={() => router.push(`/dashboard/edit/coupon/${coupon.id}`)}
                    />
                  </Td>
                  <Td>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsModalOpen(true)}
                    />
                  </Td>
                  <ConfirmModal
                    target={"Coupon"}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    cancelBtnRef={cancelButtonRef}
                    actionFn={() => removeCoupon(coupon.id)}
                    isLoading={isDeleteInProgress}
                  />
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
