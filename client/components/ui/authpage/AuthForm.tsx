import React, { Dispatch, MutableRefObject, SetStateAction } from "react";

import Spinner from "../../widgets/Spinner";

interface Props {
  authType: "login" | "signup";
  handleSubmit: any;
  submitFn: (...any) => void;
  setIsPasswordShown: Dispatch<SetStateAction<boolean>>;
  errMsgRef: MutableRefObject<HTMLParagraphElement>;
  isLoading: boolean;
}

const AuthForm: React.FC<Props> = ({
  authType,
  children,
  handleSubmit,
  submitFn,
  setIsPasswordShown,
  errMsgRef,
  isLoading,
}) => {
  return (
    <>
      <main>
        <form onSubmit={handleSubmit(submitFn)}>
          <h2>{authType === "signup" ? "Sign Up" : "Login"}</h2>
          {children}
          <div className="show-password-container">
            <input
              type="checkbox"
              id={"show-password"}
              onChange={(e) => setIsPasswordShown(e.target.checked)}
            />
            <label htmlFor={"show-password"}>Show Password</label>
          </div>
          <button className="auth-btn" type={"submit"} disabled={isLoading}>
            {isLoading ? <Spinner size={10} /> : authType === "login" ? "Login" : "Sign Up"}
          </button>
          <p className="err-msg" ref={errMsgRef} />
        </form>
      </main>

      <style jsx>{`
        main {
          position: relative;
          width: 100%;
          height: calc(100vh - var(--navbarHeight));
          min-height: 580px;
          background: linear-gradient(90deg, var(--primaryColor) 0%, #d23c9e 100%);
        }

        form {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
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

        .err-msg {
          margin-top: 15px;
        }
      `}</style>
    </>
  );
};

export default AuthForm;
