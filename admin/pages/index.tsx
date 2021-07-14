import React, { useState, useRef } from "react";
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";

import HOST from "../constants/host";

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const login = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    errMsgRef.current.innerText = "";

    try {
      const res = await fetch(`${HOST}/auth/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });
      const data = await res.json();

      if (res.ok) {
      } else {
        errMsgRef.current.innerText = data.message;
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Center width={"100vw"} height={"100vh"}>
        <VStack
          as={"form"}
          spacing={"20px"}
          width={"30%"}
          minW={"350px"}
          bg={"gray.50"}
          borderRadius={"10px"}
          padding={"20px"}
          onSubmit={login}
        >
          <FormControl id={"username"}>
            <FormLabel>Username</FormLabel>
            <Input type={"text"} />
          </FormControl>
          <FormControl id={"password"} marginTop={"20px"}>
            <FormLabel>Password</FormLabel>
            <Input type={"password"} />
          </FormControl>
          <Button colorScheme={"blue"} type={"submit"} disabled={isLoading}>
            Login
          </Button>
          <p className="err-msg" ref={errMsgRef} />
        </VStack>
      </Center>
    </>
  );
};

export default LoginPage;
