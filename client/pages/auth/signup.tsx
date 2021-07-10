import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import AuthForm from "../../components/ui/AuthForm";
import IconInput from "../../components/widgets/IconInput";

interface FormInput {
  username: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
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
          .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
            message:
              "password must be at least 8 characters long, and have at least one letter and one number",
          })
          .required(),
      })
    ),
  });

  const signup = () => {};

  return (
    <>
      <AuthForm
        authType={"signup"}
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
