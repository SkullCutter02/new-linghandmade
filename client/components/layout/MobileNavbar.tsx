import React, { Dispatch, SetStateAction } from "react";

import NavbarTabs from "./NavbarTabs";

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  hamburgerRevealWidth: number;
}

const MobileNavbar: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen, hamburgerRevealWidth }) => {
  return (
    <>
      <div
        className={`mobile-nav${isMenuOpen ? " enabled" : ""}`}
        onClick={(e: any) => {
          if (isMenuOpen && e.target.localName !== "li") setIsMenuOpen(false);
        }}
      >
        <div className="overlay" />
        <NavbarTabs isMobile={true} isMenuOpen={isMenuOpen} />
      </div>

      <style jsx>{`
        .mobile-nav {
          display: none;
          opacity: 0;
          transition: opacity 0.6s;
          position: fixed;
          z-index: 2;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }

        .mobile-nav.enabled {
          opacity: 100%;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          opacity: 30%;
        }

        @media screen and (max-width: ${hamburgerRevealWidth}px) {
          .mobile-nav {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default MobileNavbar;
