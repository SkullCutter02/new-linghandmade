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
        <div className="modal-btns">
          <button className="to-cart-btn">Add to Cart</button>
          <button className="cancel-btn" onClick={() => setIsCartModalOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>

      <style jsx>{`
        .modal-btns {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
        }

        .modal-btns button {
          width: 48%;
          height: 30px;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          color: #fff;
        }

        .to-cart-btn {
          background: var(--primaryColor);
        }

        .cancel-btn {
          background: #c60a0a;
        }

        .modal-select-amt {
          display: flex;
          align-items: center;
        }

        .modal-select-amt p {
          margin-right: 20px;
        }
      `}</style>
    </>
  );
};

export default AddToCartModal;
