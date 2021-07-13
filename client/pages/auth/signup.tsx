import React, { useState, useRef } from "react";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import AuthForm from "../../components/ui/authpage/AuthForm";
import IconInput from "../../components/widgets/IconInput";
import HOST from "../../constants/host";
import getMe from "../../queries/getMe";
import passwordRegex from "../../constants/passwordRegex";

interface FormInput {
  username: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

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
        username: yup
          .string()
          .matches(/^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/, {
            message:
              "username must only contain alphanumeric letters, numbers, hyphens and underscores",
          })
          .required(),
        email: yup.string().email().required(),
        password: yup
          .string()
          .matches(passwordRegex.regex, {
            message: passwordRegex.message,
          })
          .required(),
      })
    ),
  });

  const signup = async ({ username, email, password }: FormInput) => {
    setIsLoading(true);
    errMsgRef.current.innerText = "";

    const res = await fetch(`${HOST}/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      await queryClient.prefetchQuery("user", getMe);
      await router.push("/");
    } else {
      errMsgRef.current.innerText = data.message;
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthForm
        authType={"sign up"}
        handleSubmit={handleSubmit}
        submitFn={signup}
        setIsPasswordShown={setIsPasswordShown}
        errMsgRef={errMsgRef}
        isLoading={isLoading}
      >
        <IconInput
          name={"username"}
          icon={faUser}
          placeholder={"Type your username"}
          margin={"20px 0 0 0"}
          register={register}
          error={errors.username}
        />
        <IconInput
          name={"email"}
          icon={faEnvelope}
          inputType={"email"}
          placeholder={"Type your email"}
          margin={"20px 0 0 0"}
          register={register}
          error={errors.email}
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

export default SignupPage;
