import React from "react";

const FooterForm: React.FC = () => {
  return (
    <>
      <form>
        <h3>Send Us An Email</h3>
        <input type="text" placeholder={"Your Name..."} />
        <input type="text" placeholder={"Your Email..."} />
        <input type="text" placeholder={"Subject..."} />
        <textarea placeholder={"Message..."} />
        <button type={"submit"}>SEND</button>
      </form>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: absolute;
          top: 100px;
          right: 15%;
          box-shadow: 0 0 20px 2px #c4c4c4;
          width: 33%;
          padding: 60px 50px;
          height: 560px;
          background: #fff;
        }

        form h3 {
          color: var(--primaryTextColor);
          text-transform: uppercase;
        }

        form input,
        form textarea {
          border: 1px solid var(--primaryColor);
          resize: none;
          padding: 10px;
          font-size: 0.8rem;
        }

        form input:invalid {
          border: 1px solid red;
        }

        form textarea {
          height: 150px;
        }

        form button {
          width: 100%;
          height: 40px;
          border: 1px solid var(--primaryColor);
          background: var(--primaryColor);
          box-shadow: inset 0 0 0 0.09px #fff;
          color: #fff;
          font-size: 1rem;
          transition: all 0.4s;
        }

        form button:hover:not(:disabled) {
          box-shadow: inset 500px 0 0 0.09px #fff;
          color: var(--primaryColor);
        }

        @media screen and (max-width: 900px) {
          form {
            width: 40%;
            right: 5%;
          }
        }

        @media screen and (max-width: 690px) {
          form {
            right: 50%;
            width: 80%;
            padding: 50px 40px;
            transform: translate(50%, 0);
            top: 450px;
          }
        }
      `}</style>
    </>
  );
};

export default FooterForm;
