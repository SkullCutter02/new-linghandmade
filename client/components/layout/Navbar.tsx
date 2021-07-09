import React from "react";

const Navbar: React.FC = () => {
  return (
    <>
      <nav>
        <div className="left-content">
          <ul>
            <li className={"active"}>All Products</li>
            <li>Categories</li>
          </ul>
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

        ul {
          display: flex;
        }

        li {
          margin-left: 30px;
          font-weight: 500;
          position: relative;
          transition: color 0.3s;
          cursor: pointer;
        }
        
        li.active {
          color: var(--primaryColor);
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
          color: var(--primaryColor);
        }

        li:hover::after {
          transform: translateX(-50%) scaleX(1);
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
      `}</style>
    </>
  );
};

export default Navbar;
