import React, { useState } from "react";
import { VStack, Center, Image } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import getProducts from "../../queries/getProducts";
import AdminGrid from "../../components/AdminGrid";
import AdminHeader from "../../components/AdminHeader";

const ProductDashboardPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const { data: productsData } = useQuery<{ products: Product[]; hasMore: boolean }>(
    ["products", page, filter],
    () => getProducts(page, filter)
  );

  return (
    <>
      <VStack width={"100%"}>
        <AdminGrid template={"1fr 1fr 1fr 1fr 1fr 1fr"} isHeader>
          <AdminHeader text={"name"} />
          <AdminHeader text={"price"} />
          <AdminHeader text={"discount"} />
          <AdminHeader text={"main image"} />
          <AdminHeader text={"amount left"} />
          <AdminHeader text={"featured"} />
        </AdminGrid>
        {productsData.products.map((product) => (
          <AdminGrid key={product.id} template={"1fr 1fr 1fr 1fr 1fr 1fr"}>
            <Center>{product.name}</Center>
            <Center>${product.price}</Center>
            <Center>{product.discount || 0}%</Center>
            <Image
              src={product.mainImgUrl}
              maxW={"100%"}
              maxH={"100%"}
              objectFit={"cover"}
              margin={"0 auto"}
            />
            <Center>{product.amtLeft}</Center>
            <Center>{product.featured ? "true" : "false"}</Center>
          </AdminGrid>
        ))}
      </VStack>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["products", 1, ""], () => getProducts(1, ""));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductDashboardPage;
