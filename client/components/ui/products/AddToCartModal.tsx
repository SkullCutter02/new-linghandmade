import React, { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "react-query";
import Select from "react-select";
import Modal, { Styles } from "react-modal";
import { toast } from "react-toastify";

import Spinner from "../../widgets/Spinner";
import HOST from "../../../constants/host";
import toastOptions from "../../../config/toastOptions";
import { Product } from "../../../types/product";

interface Props {
  isCartModalOpen: boolean;
  setIsCartModalOpen: Dispatch<SetStateAction<boolean>>;
  product: Product;
}

const AddToCartModal: React.FC<Props> = ({ isCartModalOpen, setIsCartModalOpen, product }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amt, setAmt] = useState<SelectOptions<number>>({ value: 1, label: 1 });

  const queryClient = useQueryClient();

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

  const addToCart = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const res = await fetch(`${HOST}/user/cart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        amount: Math.min(amt.value, product.amtLeft),
      }),
    });
    const data = await res.json();

    if (res.ok) {
      queryClient.setQueryData("cart", data.userInCartProducts);
      toast.success("Item successfully added to cart!", toastOptions);
      setIsLoading(false);
      setIsCartModalOpen(false);
    } else {
      toast.warn("Something went wrong, please try again!", toastOptions);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isCartModalOpen}
        onRequestClose={() => {
          if (!isLoading) setIsCartModalOpen(false);
        }}
        style={modalStyle}
        closeTimeoutMS={200}
        appElement={process.browser && document.getElementById("__next")}
      >
        <div className="modal-select-amt">
          <p>Amount: </p>
          <Select
            defaultValue={{ label: 1, value: 1 }}
            options={[...Array(product.amtLeft + 1).keys()].slice(1).map((n) => {
              return { label: n, value: n };
            })}
            className="select-amt"
            onChange={(value) => setAmt(value)}
          />
        </div>
        <div className="modal-btns">
          <button className="to-cart-btn" onClick={addToCart}>
            {isLoading ? <Spinner size={10} /> : "Add to Cart"}
          </button>
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
          position: relative;
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
