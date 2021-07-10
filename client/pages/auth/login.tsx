import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import AuthForm from "../../components/ui/AuthForm";
import IconInput from "../../components/widgets/IconInput";
import HOST from "../../constants/host";

interface FormInput {
  credentials: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        credentials: yup.string().required(),
        password: yup.string().required(),
      })
    ),
  });

  const login = async ({ credentials, password }: FormInput) => {
    setIsLoading(true);
    errMsgRef.current.innerText = "";

    const res = await fetch(`${HOST}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credentials, password }),
    });
    const data = await res.json();

    if (res.ok) {
      await router.push("/");
    } else {
      errMsgRef.current.innerText = data.message;
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthForm
        authType={"login"}
        handleSubmit={handleSubmit}
        submitFn={login}
        setIsPasswordShown={setIsPasswordShown}
        errMsgRef={errMsgRef}
        isLoading={isLoading}
      >
        <IconInput
          name={"credentials"}
          icon={faUser}
          placeholder={"Type your username / email"}
          margin={"20px 0 0 0"}
          register={register}
          error={errors.credentials}
        />
        <IconInput
          name={"password"}
          icon={faLock}
          inputType={isPasswordShown ? "text" : "password"}
          placeholder={"Type your password"}
          margin={"20px 0 0 0"}
          register={register}
          error={errors.password}
        />
      </AuthForm>
    </>
  );
};

export default LoginPage;
