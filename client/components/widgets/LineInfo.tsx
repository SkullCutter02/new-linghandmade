import React from "react";

interface Props {
  text: string;
  margin?: string;
}

const LineInfo: React.FC<Props> = ({ text, margin = "0" }) => {
  return (
    <>
      <div>
        <p>
          <span>{text}</span>
        </p>
      </div>

      <style jsx>{`
        div {
          margin: ${margin};
        }

        p {
          width: 100%;
          text-align: center;
          border-bottom: 0.5px solid #aeaeae;
          line-height: 0.1em;
          margin: 10px 0 20px;
        }

        span {
          background: #fff;
          padding: 0 10px;
          font-size: 0.7rem;
        }
      `}</style>
    </>
  );
};

export default LineInfo;
