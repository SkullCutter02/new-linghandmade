import React from "react";
import { User } from "../../../types/user";
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faClock } from "@fortawesome/free-regular-svg-icons";

interface Props {
  user: User;
}

const UserProfile: React.FC<Props> = ({ user }) => {
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
      </div>

      <style jsx>{`
        .email,
        .date {
          margin: 8px 0;
        }
      `}</style>
    </>
  );
};

export default UserProfile;
