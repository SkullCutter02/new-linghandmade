import React from "react";

interface Props {
  onUndo: () => void;
  closeToast?: () => void;
}

const UndoToast: React.FC<Props> = ({ onUndo, closeToast }) => {
  const handleClick = () => {
    onUndo();
    closeToast && closeToast();
  };

  return (
    <>
      <div>
        <p>
          Item removed from cart. <span onClick={handleClick}>Undo</span>
        </p>
      </div>

      <style jsx>{`
        span {
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default UndoToast;
