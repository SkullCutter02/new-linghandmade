import React, { Dispatch, SetStateAction } from "react";

interface Props {
  authType: "login" | "signup";
  handleSubmit: any;
  submitFn: (...any) => void;
  setIsPasswordShown: Dispatch<SetStateAction<boolean>>;
}

const AuthForm: React.FC<Props> = ({
  authType,
  children,
  handleSubmit,
  submitFn,
  setIsPasswordShown,
}) => {
  return (
    <>
      <main>
        <form onSubmit={handleSubmit(submitFn)}>
          <h2>{authType}</h2>
          {children}
          <div className="show-password-container">
            <input type="checkbox" onChange={(e) => setIsPasswordShown(e.target.checked)} />
            <p>Show Password</p>
          </div>
          <button className="auth-btn">{authType === "login" ? "Login" : "Sign Up"}</button>
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

        .show-password-container p {
          font-size: 0.75rem;
          margin-left: 7px;
        }

        .auth-btn {
          width: 100%;
          margin-top: 30px;
          border: none;
          background: var(--primaryColor);
          color: #fff;
          padding: 8px 12px;
          border-radius: 50px;
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
};

export default AuthForm;
