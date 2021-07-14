import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/global.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <ChakraProvider>
        <Head>
          <title>Ling Handmade Admin</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
