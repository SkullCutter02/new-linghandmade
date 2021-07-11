import React from "react";
import { GetServerSideProps } from "next";
import { dehydrate } from "react-query/hydration";
import { QueryClient } from "react-query";

import Hero from "../components/ui/homepage/Hero";
import FrontPageInfo from "../components/ui/homepage/FrontPageInfo";
import getFeaturedProducts from "../queries/getFeaturedProducts";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FrontPageInfo />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("featured-products", getFeaturedProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
