import React from "react";
import Image from "next/image";

import heroPic from "../../public/hero.jpg";

const Hero: React.FC = () => {
  return (
    <>
      <div className="hero-container">
        <div className="overlay" />
        <Image src={heroPic} objectFit={"cover"} layout={"fill"} />
        <p>Ling Handmade</p>
      </div>

      <style jsx>{`
        .hero-container {
          width: 100%;
          height: calc(100vh - 100px);
          position: relative;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          opacity: 20%;
          z-index: 1;
        }

        .hero-container p {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 3rem;
          font-weight: 800;
          z-index: 1;
          text-transform: uppercase;
          border: 3px solid currentColor;
          padding: 50px;
          text-align: center;
        }

        @media screen and (max-width: 650px) {
          .hero-container {
            height: 60vh;
          }

          .hero-container p {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;
