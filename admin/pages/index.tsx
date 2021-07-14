import React, { useState, useRef } from "react";

import HOST from "../constants/host";

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const login = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    errMsgRef.current.innerText = "";

    try {
      const res = await fetch(`${HOST}/auth/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });
      const data = await res.json();

      if (res.ok) {
      } else {
        errMsgRef.current.innerText = data.message;
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={login}>
        <input type="text" placeholder="Username" name={"username"} />
        <input type="password" placeholder="Password" name={"password"} />
        <button type="submit" disabled={isLoading}>
          Log In
        </button>
        <p className="err-msg" ref={errMsgRef} />
      </form>

      <style jsx>{`
        form {
          height: 400px;
          width: 30%;
          min-width: 300px;
          margin: 140px auto;
          background: #f8f8f8;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        input {
          width: 80%;
          margin-bottom: 40px;
          padding: 3px 4px;
        }

        .err-msg {
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default LoginPage;
