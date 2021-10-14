import React, { useState } from "react";
import { User } from "../../../types/user";
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faClock } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";

import HOST from "../../../constants/host";

interface Props {
  user: User;
}

const UserProfile: React.FC<Props> = ({ user }) => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const router = useRouter();

  const logOut = async () => {
    setIsLoggingOut(true);

    try {
      const res = await fetch(`${HOST}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        await router.push("/");
        await router.reload();
      } else {
        setIsLoggingOut(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="user-information">
        <h1>{user.username}</h1>
        <p className="email">
          <FontAwesomeIcon icon={faEnvelope} /> Email: {user.email}
        </p>
        <p className="date">
          <FontAwesomeIcon icon={faClock} /> Account created on:{" "}
          {format(parseISO(user.createdAt), "MMM. d, yyyy")}
        </p>
        <button onClick={logOut} disabled={isLoggingOut}>
          Log Out
        </button>
      </div>

      <style jsx>{`
        .email,
        .date {
          margin: 8px 0;
        }

        button {
          margin-right: 30px;
          margin-top: 30px;
          padding: 7px 13px;
          font-size: 14px;
          font-weight: 500;
          border-radius: 6px;
          position: relative;
          border: 2px solid #b80909;
          background: #ff1b1b;
          color: #fff;
          transition: all 0.3s;
        }

        button:hover {
          background: #fff;
          color: var(--primaryTextColor);
        }
      `}</style>
    </>
  );
};

export default UserProfile;
