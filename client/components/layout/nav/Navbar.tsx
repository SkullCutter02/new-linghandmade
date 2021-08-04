import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { HamburgerButton } from "react-hamburger-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import MobileNavbar from "./MobileNavbar";
import NavbarTabs from "./NavbarTabs";
import getMe from "../../../queries/getMe";
import getRedirectQuery from "../../../utils/getRedirectQuery";
import buildRedirectUrn from "../../../utils/buildRedirectUrn";
import { User } from "../../../types/user";

const Navbar: React.FC = () => {
  const hamburgerRevealWidth = 650;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { isLoading, isError, data: user } = useQuery<User>("user", getMe);

  const router = useRouter();

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
              color={isMenuOpen ? "#0da3d6" : "#000"}
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
          {isLoading || isError || !user?.username ? (
            <>
              <Link
                href={`/auth/login${getRedirectQuery(
                  router.pathname,
                  router.asPath,
                  buildRedirectUrn(router.query)
                )}`}
              >
                <button className="login-btn">Log in</button>
              </Link>
              <Link
                href={`/auth/signup${getRedirectQuery(
                  router.pathname,
                  router.asPath,
                  buildRedirectUrn(router.query)
                )}`}
              >
                <button className="signup-btn">Sign Up</button>
              </Link>
            </>
          ) : (
            <div className="username">
              <Link href={"/cart"}>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ marginRight: "20px", cursor: "pointer" }}
                />
              </Link>
              <FontAwesomeIcon icon={faUser} />
              <p>{user.username}</p>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: var(--navbarHeight);
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
          position: relative;
          z-index: ${isMenuOpen ? "initial" : "3"};
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

        .username {
          display: flex;
          align-items: center;
          margin-right: 20px;
        }

        .username p {
          margin: 0 10px;
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
