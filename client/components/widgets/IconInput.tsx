import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";

interface Props {
  inputType?: string;
  placeholder?: string;
  name: string;
  icon?: IconDefinition;
  width?: string;
  margin?: string;
  required?: boolean;
  register?: any;
  error?: {
    message?: string;
  };
}

const IconInput: React.FC<Props> = ({
  inputType = "text",
  placeholder = "",
  name,
  icon,
  width = "100%",
  margin = "0",
  required = true,
  register,
  error,
}) => {
  return (
    <>
      <div className="container">
        <p className="label">{name}</p>
        <div className="input-container">
          <FontAwesomeIcon
            icon={icon}
            style={{ width: "15px", height: "15px", position: "absolute", top: "11px", left: "0" }}
          />
          <input
            type={inputType}
            placeholder={placeholder}
            required={required}
            {...(register && register(name))}
          />
        </div>
        <p className="err-msg">{error?.message}</p>
      </div>

      <style jsx>{`
        .container {
          margin: ${margin};
        }

        .label {
          font-size: 0.75rem;
          text-transform: capitalize;
        }

        .input-container {
          position: relative;
        }

        input {
          border: 0;
          outline: 0;
          border-bottom: 0.5px solid #999999;
          text-indent: ${icon ? "25px" : 0};
          padding: 10px 0;
          font-size: 0.8rem;
          width: ${width};
        }

        .err-msg {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default IconInput;
