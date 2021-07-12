import React, { CSSProperties, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import Zoom from "react-medium-image-zoom";
import Modal, { Styles } from "react-modal";
import Select from "react-select";

import getProduct from "../../queries/getProduct";

const ProductPage: React.FC = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
  const [amt, setAmt] = useState<SelectOptions<number>>(null);

  const router = useRouter();
  const { product: productId } = router.query;

  const { data: product } = useQuery<Product>(["product", productId], () =>
    getProduct(productId as string)
  );

  const carouselArrowStyle: CSSProperties = {
    position: "absolute",
    top: "45%",
    zIndex: isCartModalOpen ? 0 : 1,
    cursor: "pointer",
    height: "25px",
    width: "25px",
  };

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
            options={[...Array(product.amtLeft + 1).keys()].slice(1).map((n) => {
              return { label: n, value: n };
            })}
            className="select-amt"
            onChange={(value) => setAmt(value)}
          />
        </div>
        <button className="modal-btn">Add to Cart</button>
      </Modal>
      <div className="product">
        <div className="carousel-container">
          <Carousel
            showArrows={false}
            showIndicators={false}
            thumbWidth={150}
            transitionTime={500}
            infiniteLoop={true}
            renderArrowPrev={(clickHandler) => (
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                onClick={clickHandler}
                style={{ ...carouselArrowStyle, left: "10px" }}
              />
            )}
            renderArrowNext={(clickHandler) => (
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                onClick={clickHandler}
                style={{ ...carouselArrowStyle, right: "10px" }}
              />
            )}
          >
            {[product.mainImgUrl].concat(product.carouselImgUrls).map((image, index) => (
              <Zoom wrapStyle={{ height: "100%" }} key={index + Date.now()}>
                <img src={image} alt={product.name} style={{ height: "90%", objectFit: "cover" }} />
              </Zoom>
            ))}
          </Carousel>
        </div>
        <div className="text-content">
          <div className="left">
            <h1>{product.name}</h1>
            <p className="secondary-text description">{product.description}</p>
            <p className="secondary-text remarks">
              {product.remarks && `Remarks: ${product.remarks}`}
            </p>
          </div>
          <div className="right">
            <p>Price: HK${product.price}</p>
            <button
              className="add-cart-btn"
              onClick={() => setIsCartModalOpen(true)}
              disabled={product.amtLeft <= 0}
            >
              {product.amtLeft ? "Add to Cart" : "Sold Out"}
            </button>
            <p className="secondary-text amt-left">{product.amtLeft} left</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product {
          padding: 50px 3%;
          display: flex;
        }

        .carousel-container {
          width: 45%;
        }

        .product .text-content {
          margin-left: 40px;
          width: 55%;
          display: flex;
        }

        .text-content .left {
          width: 65%;
          margin-right: 40px;
        }

        .text-content .left * {
          margin-bottom: 20px;
          line-height: 1.3em;
        }

        .text-content .right {
          padding: 20px 25px;
          background: #eeeeee;
          width: 35%;
          height: max-content;
        }

        .right > * {
          margin-bottom: 15px;
        }

        .product .text-content h1 {
          font-size: 2.5rem;
        }

        .add-cart-btn,
        .modal-btn {
          width: 100%;
          height: 30px;
          background: var(--primaryColor);
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          color: #fff;
          box-shadow: inset 0 0 0 0.09px #fff;
          transition: all 0.4s;
        }

        .add-cart-btn:hover:not(:disabled) {
          box-shadow: inset 300px 0 0 0.09px #fff;
          color: var(--primaryColor);
        }

        .add-cart-btn:disabled {
          background: #de0d0d;
          cursor: initial;
        }

        .secondary-text {
          color: var(--secondaryTextColor);
        }

        .remarks {
          font-size: 0.85rem;
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

        @media screen and (max-width: 1000px) {
          .product {
            flex-direction: column;
          }

          .carousel-container {
            width: 100%;
          }

          .product .text-content {
            width: 100%;
            margin-top: 50px;
            margin-left: 0;
            padding: 0 20px;
          }
        }

        @media screen and (max-width: 550px) {
          .product .text-content {
            flex-direction: column;
          }

          .product .text-content > .left {
            width: 100%;
          }

          .right {
            margin-top: 30px;
            width: 80% !important;
            align-self: center;
          }
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const productId = ctx.query.product as string;

  await queryClient.prefetchQuery(["product", productId], () => getProduct(productId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductPage;
