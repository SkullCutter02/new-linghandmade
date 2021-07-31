import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Spinner from "../../widgets/Spinner";
import HOST from "../../../constants/host";

interface FormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const FooterForm: React.FC = () => {
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        subject: yup.string().required(),
        message: yup.string().min(80).required(),
      })
    ),
  });

  const sendEmail = async (input: FormInput) => {
    setIsEmailSending(true);
    errMsgRef.current.innerText = "";

    try {
      const res = await fetch(`${HOST}/email/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();

      if (res.ok) {
        reset();
      } else {
        errMsgRef.current.innerText = data.message;
      }

      setIsEmailSending(false);
    } catch (err) {
      console.log(err);
      setIsEmailSending(false);
      errMsgRef.current.innerText = err;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(sendEmail)} noValidate>
        <h3>Send Us An Email</h3>
        <input
          className={!!errors.name?.message && "invalid"}
          type="text"
          placeholder={"Your Name..."}
          {...register("name")}
        />
        <input
          className={!!errors.email?.message && "invalid"}
          type="text"
          placeholder={"Your Email..."}
          {...register("email")}
        />
        <input
          className={!!errors.subject?.message && "invalid"}
          type="text"
          placeholder={"Subject..."}
          {...register("subject")}
        />
        <textarea
          className={!!errors.message?.message && "invalid"}
          placeholder={"Message..."}
          {...register("message")}
        />
        <p className="err-msg">{errors.message?.message}</p>
        <button type={"submit"} disabled={isEmailSending}>
          {isEmailSending ? <Spinner size={10} /> : "SEND"}
        </button>
        <p className="err-msg" ref={errMsgRef} />
      </form>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: absolute;
          top: 100px;
          right: 15%;
          box-shadow: 0 0 20px 2px #c4c4c4;
          width: 33%;
          padding: 60px 50px;
          height: 560px;
          background: #fff;
        }

        form h3 {
          color: var(--primaryTextColor);
          text-transform: uppercase;
        }

        form input,
        form textarea {
          border: 1px solid var(--primaryColor);
          resize: none;
          padding: 10px;
          font-size: 0.8rem;
        }

        .invalid {
          border: 1px solid red !important;
        }

        form textarea {
          height: 150px;
        }

        form button {
          width: 100%;
          height: 40px;
          border: 1px solid var(--primaryColor);
          background: var(--primaryColor);
          box-shadow: inset 0 0 0 0.09px #fff;
          color: #fff;
          font-size: 1rem;
          transition: all 0.4s;
          position: relative;
        }

        form button:hover:not(:disabled) {
          box-shadow: inset 500px 0 0 0.09px #fff;
          color: var(--primaryColor);
        }

        @media screen and (max-width: 900px) {
          form {
            width: 40%;
            right: 5%;
          }
        }

        @media screen and (max-width: 690px) {
          form {
            right: 50%;
            width: 80%;
            padding: 50px 40px;
            transform: translate(50%, 0);
            top: 450px;
          }
        }
      `}</style>
    </>
  );
};

export default FooterForm;
