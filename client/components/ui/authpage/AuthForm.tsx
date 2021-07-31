import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import Link from "next/link";
import GoogleLogin from "react-google-login";

import Spinner from "../../widgets/Spinner";
import LineInfo from "../../widgets/LineInfo";
import useGoogleAuthentication from "../../../hooks/useGoogleAuthentication";
import capitalise from "../../../utils/capitalise";

interface Props {
  authType: "login" | "sign up" | "forgot password" | "reset password";
  handleSubmit: any;
  submitFn: (...any) => void;
  setIsPasswordShown?: Dispatch<SetStateAction<boolean>>;
  errMsgRef: MutableRefObject<HTMLParagraphElement>;
  isLoading: boolean;
  buttonText?: string;
  redirectUrn?: string;
}

const AuthForm: React.FC<Props> = ({
  authType,
  children,
  handleSubmit,
  submitFn,
  setIsPasswordShown,
  errMsgRef,
  isLoading,
  buttonText,
  redirectUrn,
}) => {
  const { handleSuccess } = useGoogleAuthentication(errMsgRef, redirectUrn);

  return (
    <>
      <main>
        <form onSubmit={handleSubmit(submitFn)}>
          <h2>{authType}</h2>
          {children}
          {authType !== "forgot password" && (
            <div className="show-password-container">
              <input
                type="checkbox"
                id={"show-password"}
                onChange={(e) => setIsPasswordShown(e.target.checked)}
              />
              <label htmlFor={"show-password"}>Show Password</label>
            </div>
          )}
          {(authType === "login" || authType === "sign up") && (
            <Link
              href={
                authType === "sign up"
                  ? `/auth/login?redirect=${redirectUrn}`
                  : "/auth/forgot-password"
              }
            >
              <p className="extra-info">
                {authType === "sign up" ? "Already have an account? Log in" : "Forgot password?"}
              </p>
            </Link>
          )}
          <button className="auth-btn" type={"submit"} disabled={isLoading}>
            {isLoading ? <Spinner size={10} /> : buttonText || authType}
          </button>
          <p className="err-msg" ref={errMsgRef} />
          {(authType === "login" || authType === "sign up") && (
            <>
              <LineInfo text={"or"} margin={"25px 0"} />
              <div className="google-btn">
                <GoogleLogin
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
                  disabled={false}
                  onSuccess={handleSuccess}
                  buttonText={`${capitalise(authType)} with Google`}
                />
              </div>
            </>
          )}
        </form>
      </main>

      <style jsx>{`
        main {
          width: 100%;
          min-height: calc(100vh - var(--navbarHeight));
          padding: 50px 0;
          background: linear-gradient(90deg, var(--primaryColor) 0%, #d23c9e 100%);
          display: grid;
          place-items: center;
        }

        form {
          width: 28%;
          min-width: 350px;
          background: #fff;
          border-radius: 10px;
          padding: 40px 45px;
        }

        h2 {
          text-align: center;
          text-transform: capitalize;
          color: #000;
        }

        .show-password-container {
          margin-top: 30px;
          display: flex;
        }

        .show-password-container label {
          font-size: 0.75rem;
          margin-left: 7px;
        }

        .auth-btn {
          width: 100%;
          margin-top: 30px;
          border: none;
          background: var(--primaryColor);
          color: #fff;
          padding: 0 12px;
          height: 33px;
          border-radius: 50px;
          text-transform: uppercase;
          position: relative;
        }

        .extra-info {
          float: right;
          font-size: 0.75rem;
          margin-top: 20px;
          text-decoration: underline;
          cursor: pointer;
        }

        .err-msg {
          margin-top: 15px;
        }

        .google-btn {
          display: flex;
          place-content: center;
        }
      `}</style>
    </>
  );
};

export default AuthForm;
