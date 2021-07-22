import React from "react";
import Link from "next/link";

const CheckoutSuccessPage: React.FC = () => {
  return (
    <>
      <div>
        <h1>
          Checkout Success! You'll receive an email shortly containing your order's information!
        </h1>
        <Link href={"/"}>
          <button>Return to Home Page</button>
        </Link>
      </div>

      <style jsx>{`
        div {
          height: calc(100vh - var(--navbarHeight));
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1 {
          font-size: 1.7rem;
          width: 60%;
          text-align: center;
        }

        button {
          margin-top: 30px;
          border: none;
          background: var(--secondaryColor);
          color: #fff;
          padding: 8px 12px;
          box-shadow: inset 0 0 0 0.09px #f3f3f3;
          transition: all 0.4s;
        }

        button:hover {
          box-shadow: inset 300px 0 0 0.09px #f3f3f3;
          color: var(--secondaryColor);
        }

        @media screen and (max-width: 700px) {
          h1 {
            width: 80%;
            font-size: 1.6rem;
          }
        }
      `}</style>
    </>
  );
};

export default CheckoutSuccessPage;
