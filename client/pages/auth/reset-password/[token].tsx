import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import AuthForm from "../../../components/ui/authpage/AuthForm";
import IconInput from "../../../components/widgets/IconInput";
import toastOptions from "../../../config/toastOptions";
import HOST from "../../../constants/host";
import passwordRegex from "../../../constants/passwordRegex";

interface FormInput {
  password: string;
}

const ResetPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const router = useRouter();
  const { token } = router.query;

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        password: yup
          .string()
          .matches(passwordRegex.regex, {
            message: passwordRegex.message,
          })
          .required(),
      })
    ),
  });

  const resetPassword = async ({ password }: FormInput) => {
    try {
      setIsLoading(true);
      errMsgRef.current.innerText = "";

      const res = await fetch(`${HOST}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(
          "Password successfully reset! Redirecting you to login page...",
          toastOptions
        );
        await router.push("/auth/login");
      } else {
        errMsgRef.current.innerText = data.message;
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again!", toastOptions);
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthForm
        authType={"reset password"}
        handleSubmit={handleSubmit}
        submitFn={resetPassword}
        errMsgRef={errMsgRef}
        isLoading={isLoading}
        setIsPasswordShown={setIsPasswordShown}
      >
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

export default ResetPasswordPage;
