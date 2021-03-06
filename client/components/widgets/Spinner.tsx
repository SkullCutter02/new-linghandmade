import React from "react";

interface Props {
  size?: number;
  color?: string;
}

const Spinner: React.FC<Props> = ({ size = 40, color = "var(--primaryColor)" }) => {
  return (
    <React.Fragment>
      <div className="spin" />

      <style jsx>{`
        @keyframes spinner {
          0% {
            transform: translate3d(-50%, -50%, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(-50%, -50%, 0) rotate(360deg);
          }
        }
        .spin::before {
          animation: 1.5s linear infinite spinner;
          animation-play-state: inherit;
          border: solid 5px #cfd0d1;
          border-bottom-color: ${color};
          border-radius: 50%;
          content: "";
          height: ${size}px;
          width: ${size}px;
          position: absolute;
          top: 50%;
          left: 50%;
          will-change: transform;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Spinner;
