import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import AuthForm from "../../components/ui/authpage/AuthForm";
import IconInput from "../../components/widgets/IconInput";
import HOST from "../../constants/host";
import toastOptions from "../../config/toastOptions";

interface FormInput {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errMsgRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required(),
      })
    ),
  });

  const sendEmail = async ({ email }: FormInput) => {
    try {
      setIsLoading(true);
      errMsgRef.current.innerText = "";

      const res = await fetch(`${HOST}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();

      if (res.ok) {
        emailRef.current.value = "";
        toast.success("Reset password email sent! Please check your inbox", toastOptions);
        setIsLoading(false);
      } else {
        errMsgRef.current.innerText = data.message;
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again", toastOptions);
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthForm
        authType={"forgot password"}
        handleSubmit={handleSubmit}
        submitFn={sendEmail}
        errMsgRef={errMsgRef}
        isLoading={isLoading}
        buttonText={"Send Reset Email"}
      >
        <IconInput
          name={"email"}
          icon={faEnvelope}
          inputType={"email"}
          placeholder={"Type your email"}
          margin={"20px 0 0 0"}
          register={register}
          error={errors.email}
          inputRef={emailRef}
        />
      </AuthForm>
    </>
  );
};

export default ForgotPasswordPage;
