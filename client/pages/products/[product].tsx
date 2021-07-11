import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import getProduct from "../../queries/getProduct";

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { product: productId } = router.query;

  const { data: product } = useQuery<Product>(["product", productId], () =>
    getProduct(productId as string)
  );

  return <></>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const productId = ctx.query.product as string;

  await queryClient.prefetchQuery(["product", productId], () => getProduct(productId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductPage;
