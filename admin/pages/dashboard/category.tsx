import React from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useRouter } from "next/router";

import getCategories from "../../queries/getCategories";
import DashboardHeader from "../../components/DashboardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CategoryDashboardPage: React.FC = () => {
  const { data: categories } = useQuery<Category[]>("categories", getCategories);

  const router = useRouter();

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
                <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: "pointer" }} />
              </Td>
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
