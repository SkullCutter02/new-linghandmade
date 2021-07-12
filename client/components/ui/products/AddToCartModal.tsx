import React, { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import Modal, { Styles } from "react-modal";

interface Props {
  isCartModalOpen: boolean;
  setIsCartModalOpen: Dispatch<SetStateAction<boolean>>;
  amtLeft: number;
  setAmt: Dispatch<SetStateAction<SelectOptions<number>>>;
  amt: SelectOptions<number>;
}

const AddToCartModal: React.FC<Props> = ({
  isCartModalOpen,
  setIsCartModalOpen,
  amtLeft,
  setAmt,
  amt,
}) => {
  const modalStyle: Styles = {
    content: {
      height: "max-content",
      width: "300px",
      maxWidth: "95%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "25px",
      overflow: "initial",
    },
  };

  return (
    <>
      <Modal
        isOpen={isCartModalOpen}
        onRequestClose={() => setIsCartModalOpen(false)}
        style={modalStyle}
        closeTimeoutMS={200}
        appElement={process.browser && document.getElementById("__next")}
      >
        <div className="modal-select-amt">
          <p>Amount: </p>
          <Select
            defaultValue={{ label: 1, value: 1 }}
            options={[...Array(amtLeft + 1).keys()].slice(1).map((n) => {
              return { label: n, value: n };
            })}
            className="select-amt"
            onChange={(value) => setAmt(value)}
          />
        </div>
        <button className="modal-btn">Add to Cart</button>
      </Modal>

      <style jsx>{`
        .modal-btn {
          width: 100%;
          height: 30px;
          background: var(--primaryColor);
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          color: #fff;
        }

        .modal-select-amt {
          display: flex;
          align-items: center;
        }

        .modal-select-amt p {
          margin-right: 20px;
        }

        .modal-btn {
          margin-top: 30px;
        }
      `}</style>
    </>
  );
};

export default AddToCartModal;
