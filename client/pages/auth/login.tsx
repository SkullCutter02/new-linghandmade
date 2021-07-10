import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import AuthForm from "../../components/ui/AuthForm";
import IconInput from "../../components/widgets/IconInput";

interface FormInput {
  credentials: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

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

  const login = () => {};

  return (
    <>
      <AuthForm
        authType={"login"}
        handleSubmit={handleSubmit}
        submitFn={login}
        setIsPasswordShown={setIsPasswordShown}
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
