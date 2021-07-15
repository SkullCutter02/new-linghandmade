import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";

import DashboardLayout from "../components/layout/DashboardLayout";

import "../styles/global.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const router = useRouter();
  const path = router.asPath.split("/");

  return (
    <>
      <ChakraProvider>
        <Head>
          <title>Ling Handmade Admin</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>

        {path[1] !== "" ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </>
  );
}
