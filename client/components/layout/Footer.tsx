import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <form>
          <h3>Send Us An Email</h3>
          <input type="text" placeholder={"Your Name..."} />
          <input type="text" placeholder={"Your Email..."} />
          <input type="text" placeholder={"Subject..."} />
          <textarea placeholder={"Message..."} />
          <button type={"submit"}>SEND</button>
        </form>
        <div className="upper">
          <h2>Contact Us</h2>
          <p className="contact-us-description">
            Feel free to contact us if you have any questions, or if you want to request for any
            product
          </p>
          <div className="contact-info">
            <span>
              <FontAwesomeIcon icon={faEnvelope} /> <p>lhmsoap2018@gmail.com</p>
            </span>
            <span>
              <FontAwesomeIcon icon={faMobileAlt} /> <p>(852) 9849 6111</p>
            </span>
            <span>
              <FontAwesomeIcon icon={faInstagram} /> <a href="">Instagram</a>
            </span>
          </div>
        </div>
        <div className="lower">
          <h2>Ling Handmade</h2>
          <div className="lower-text-info">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam asperiores atque
              delectus, dolore dolores, dolorum enim error illo inventore nostrum numquam obcaecati
              odio odit provident quae, quas quia quis quos reprehenderit sapiente totam ut
              voluptate! Accusantium aliquam architecto assumenda atque beatae, cumque dolor
              excepturi maxime omnis, porro quos temporibus?
            </p>
          </div>
          <div className="links">
            <Link href={"/"}>
              <p>Home</p>
            </Link>
            <Link href={"/products?page=1&filter="}>
              <p>Products</p>
            </Link>
            <Link href={"/blog"}>
              <p>Blog</p>
            </Link>
          </div>
        </div>
      </footer>

      <style jsx>{`
        footer {
          border-top: 1px solid var(--secondaryColor);
          position: relative;
        }

        form {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: absolute;
          top: 110px;
          right: 15%;
          box-shadow: 0 0 20px 2px #e2e2e2;
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

        .upper,
        .lower {
          padding: 110px 10% 50px 10%;
        }

        p,
        span {
          font-weight: 300;
          line-height: 1.5em;
          font-size: 0.9rem;
        }

        .upper {
          width: 50%;
        }

        .contact-us-description {
          margin-top: 18px;
        }

        h2 {
          color: #000;
          text-transform: uppercase;
          letter-spacing: 1.3px;
          margin-top: 70px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          margin-top: 50px;
        }

        .contact-info > * {
          margin: 15px 0;
          display: flex;
          align-items: center;
        }

        .contact-info span > p,
        .contact-info span > a {
          margin-left: 30px;
        }

        .lower {
          background: var(--primaryColor);
        }

        .lower * {
          color: #fff;
        }

        .lower-text-info {
          width: 60%;
          margin-top: 20px;
        }

        .links {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 70px;
          margin-bottom: 50px;
        }

        .links p {
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Footer;
