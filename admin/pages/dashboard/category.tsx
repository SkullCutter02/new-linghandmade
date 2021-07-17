import React, { useState, useRef } from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useRouter } from "next/router";

import getCategories from "../../queries/getCategories";
import DashboardHeader from "../../components/DashboardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import HOST from "../../constants/host";
import ConfirmModal from "../../components/ConfirmModal";

const CategoryDashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);

  const { data: categories } = useQuery<Category[]>("categories", getCategories);

  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const removeCategory = async (categoryId: string) => {
    try {
      setIsDeleteInProgress(true);

      const res = await fetch(`${HOST}/category/${categoryId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        queryClient.setQueryData(
          "categories",
          queryClient
            .getQueryData<Category[]>("categories")
            .filter((category) => category.id !== categoryId)
        );
        setIsModalOpen(false);
      }

      setIsDeleteInProgress(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DashboardHeader createPageLink={"/create/category"} />
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th>id</Th>
            <Th>created at</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.id}>
              <Td>{category.name}</Td>
              <Td>{category.id}</Td>
              <Td>{category.createdAt}</Td>
              <Td>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(`/dashboard/edit/category/${category.id}`)}
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
                target={"Category"}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                cancelBtnRef={cancelBtnRef}
                actionFn={() => removeCategory(category.id)}
                isLoading={isDeleteInProgress}
              />
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("categories", getCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CategoryDashboardPage;
