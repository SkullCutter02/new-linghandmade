import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  hamburgerRevealWidth?: number;
  isMobile?: boolean;
  isMenuOpen?: boolean;
}

const NavbarTabs: React.FC<Props> = ({ hamburgerRevealWidth, isMobile = false, isMenuOpen }) => {
  const router = useRouter();
  const path = router.asPath.split("/");

  useEffect(() => {
    const tabs = document.getElementsByClassName("tab");

    for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");

    if (path[1].includes("products")) tabs[1].classList.add("active");
    else if (path[1] === "blog") tabs[2].classList.add("active");
    else if (path[1] === "") tabs[0].classList.add("active");
  }, [path]);

  return (
    <>
      <ul className={(isMobile ? "mobile" : "") + (isMenuOpen ? " enabled" : "")}>
        <Link href={"/"}>
          <li className="tab">Home</li>
        </Link>
        <Link href={"/products?page=1&filter="}>
          <li className="tab">All Products</li>
        </Link>
        <Link href={"/blog"}>
          <li className="tab">Blog</li>
        </Link>
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
