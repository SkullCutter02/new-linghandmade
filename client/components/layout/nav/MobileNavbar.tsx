import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import NavbarTabs from "./NavbarTabs";

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  hamburgerRevealWidth: number;
}

const MobileNavbar: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen, hamburgerRevealWidth }) => {
  const [zIndex, setZIndex] = useState<number>(-1);

  useEffect(() => {
    if (isMenuOpen) setZIndex(2);
    else {
      setTimeout(() => {
        setZIndex(-1);
      }, 600);
    }
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={`mobile-nav${isMenuOpen ? " enabled" : ""}`}
        onClick={(e: any) => {
          if (isMenuOpen && e.target.localName !== "li") setIsMenuOpen(false);
        }}
      >
        <div className="overlay" />
        <NavbarTabs isMobile={true} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <style jsx>{`
        .mobile-nav {
          display: none;
          opacity: 0;
          transition: opacity 0.6s;
          position: fixed;
          z-index: ${zIndex};
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }

        .mobile-nav.enabled {
          opacity: 100%;
        }

        .overlay {
          width: 100%;
          height: 100%;
          background: #fff;
          opacity: 80%;
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
