import React, { useState } from "react";
import { HamburgerButton } from "react-hamburger-button";

import MobileNavbar from "./MobileNavbar";
import NavbarTabs from "./NavbarTabs";

const Navbar: React.FC = () => {
  const hamburgerRevealWidth = 650;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <nav>
        <div className="left-content">
          <NavbarTabs hamburgerRevealWidth={hamburgerRevealWidth} />
          <div className="hamburger">
            <HamburgerButton
              open={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              height={15}
              width={30}
              strokeWidth={3}
              color={"#0da3d6"}
              animationDuration={0.4}
            />
          </div>
          <MobileNavbar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            hamburgerRevealWidth={hamburgerRevealWidth}
          />
        </div>
        <div className="right-content">
          <button className="login-btn">Log in</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </nav>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          padding: 30px 10px;
          font-size: 18px;
        }

        .left-content {
          display: flex;
          align-items: center;
        }

        .hamburger {
          margin-left: 15px;
          display: none;
          position: relative;
          z-index: 4;
        }

        .right-content button {
          margin-right: 30px;
          padding: 7px 13px;
          border: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 6px;
        }

        .login-btn {
          background: #fff;
        }

        .login-btn:hover {
          color: var(--primaryColor);
        }

        .signup-btn {
          background: var(--primaryColor);
          color: #fff;
        }

        @media screen and (max-width: ${hamburgerRevealWidth}px) {
          ul {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
