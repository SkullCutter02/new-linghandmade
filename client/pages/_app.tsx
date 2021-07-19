import React, { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";

import Navbar from "../components/layout/Navbar";
import CouponContextProvider from "../providers/CouponContextProvider";

import "../styles/global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-medium-image-zoom/dist/styles.css";
import "react-toastify/dist/ReactToastify.min.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CouponContextProvider>
            <Head>
              <title>Ling Handmade</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                rel="stylesheet"
              />
            </Head>
            <ToastContainer />
            <Navbar />
            <Component {...pageProps} />
          </CouponContextProvider>
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
