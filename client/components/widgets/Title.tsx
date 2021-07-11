import React from "react";

interface Props {
  text: string;
  marginBottom?: number;
  marginTop?: number;
}

const Title: React.FC<Props> = ({ text, marginBottom = 20, marginTop = 0 }) => {
  return (
    <>
      <h1>{text}</h1>

      <style jsx>{`
        h1 {
          text-align: center;
          text-transform: capitalize;
          font-size: 2.2rem;
          margin-top: ${marginTop}px;
        }

        h1::after {
          content: "";
          display: block;
          margin: 15px auto ${marginBottom}px auto;
          width: 60px;
          height: 4px;
          background: var(--secondaryColor);
        }

        @media screen and (max-width: 700px) {
          h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </>
  );
};

export default Title;
