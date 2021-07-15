import React from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Center, VStack } from "@chakra-ui/react";

import getCategories from "../../queries/getCategories";
import AdminGrid from "../../components/AdminGrid";
import AdminHeader from "../../components/AdminHeader";

const CategoryDashboardPage: React.FC = () => {
  const { data: categories } = useQuery<Category[]>("categories", getCategories);

  return (
    <>
      <VStack width={"100%"}>
        <AdminGrid template={"1fr 1fr 1fr"} isHeader={true}>
          <AdminHeader text={"name"} />
          <AdminHeader text={"id"} />
          <AdminHeader text={"created at"} />
        </AdminGrid>
        {categories.map((category) => (
          <AdminGrid key={category.id} template={"1fr 1fr 1fr"}>
            <Center>{category.name}</Center>
            <Center>{category.id}</Center>
            <Center>{category.createdAt}</Center>
          </AdminGrid>
        ))}
      </VStack>
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
