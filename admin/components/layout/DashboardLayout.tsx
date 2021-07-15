import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Flex, StackDivider, Text, VStack } from "@chakra-ui/react";

import HOST from "../../constants/host";

const DashboardLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const path = router.asPath.split("/");

  useEffect(() => {
    const getRes = async () => {
      return fetch(`${HOST}/auth/me/admin`, {
        credentials: "include",
      });
    };

    getRes().then(async (res) => {
      if (!res.ok) await router.push("/");
    });
  }, [path]);

  return (
    <>
      <Flex
        background={"blue.400"}
        width={"100vw"}
        height={"50px"}
        align={"center"}
        paddingLeft={"40px"}
      >
        <Text textTransform={"capitalize"} color={"white"}>
          {path[2]}
        </Text>
      </Flex>
      <Flex minH={"calc(100vh - 50px)"} width={"100vw"}>
        <VStack
          width={"10%"}
          spacing={"10px"}
          padding={"35px"}
          divider={<StackDivider borderColor={"gray.200"} />}
        >
          <Link href={"/dashboard/category"}>
            <Text cursor={"pointer"}>Category</Text>
          </Link>
          <Text cursor={"pointer"}>Product</Text>
        </VStack>
        <Box width={"90%"} padding={"80px"} paddingTop={"40px"}>
          <Box width={"100%"} boxShadow={"0 0 5px 2px #cacaca"} minH={"100%"} padding={"20px"}>
            {children}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default DashboardLayout;
