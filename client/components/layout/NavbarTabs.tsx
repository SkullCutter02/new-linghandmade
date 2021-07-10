import React from "react";

interface Props {
  hamburgerRevealWidth?: number;
  isMobile?: boolean;
  isMenuOpen?: boolean;
}

const NavbarTabs: React.FC<Props> = ({ hamburgerRevealWidth, isMobile = false, isMenuOpen }) => {
  return (
    <>
      <ul className={(isMobile ? "mobile" : "") + (isMenuOpen ? " enabled" : "")}>
        <li className="active">Home</li>
        <li>All Products</li>
        <li>Categories</li>
      </ul>

      <style jsx>{`
        ul {
          display: flex;
          position: relative;
          z-index: 3;
        }
        
        ul.mobile {
          flex-direction: column;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        } 

        li {
          margin-left: 30px;
          font-weight: 500;
          position: relative;
          transition: color 0.3s;
          cursor: pointer;
          z-index: 4;
        }
        
        li.active {
          color: var(--primaryColor) !important;
        }

        li::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 120%;
          width: 100%;
          height: 2px;
          background: var(--primaryColor);
          transform: translateX(-50%) scaleX(0);
          transition: all 0.3s;
        }
        
        li.active::after {
          transform: translateX(-50%); scaleX(1);
        }

        li:hover {
          color: var(--primaryColor) !important;
        }

        li:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
        
        ul.mobile li {
          margin: 15px 0;
          transition: all 0.6s;
          font-size: 24px;
        }
        
        ul.mobile li:nth-child(odd) {
          transform: translateX(-100vw);
        }
        
        ul.mobile li:nth-child(even) {
          transform: translateX(100vw);
        }
        
        ul.mobile.enabled li {
          transform: translateX(0);
        }
        
        @media screen and (max-width: ${hamburgerRevealWidth}px) {
          ul:not(.mobile) {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default NavbarTabs;
