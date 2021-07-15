import React, { useState, useRef } from "react";
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

import HOST from "../constants/host";

interface FormInput {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
      })
    ),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const router = useRouter();

  const login = async ({ username, password }: FormInput) => {
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
          username,
          password,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        await router.push("/dashboard/category");
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
          onSubmit={handleSubmit(login)}
        >
          <FormControl id={"username"} isInvalid={!!errors.username?.message} isRequired>
            <FormLabel>Username</FormLabel>
            <Input type={"text"} {...register("username")} />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            id={"password"}
            marginTop={"20px"}
            isInvalid={!!errors.password?.message}
            isRequired
          >
            <FormLabel>Password</FormLabel>
            <Input type={"password"} {...register("password")} />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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
