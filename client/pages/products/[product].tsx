import React, { CSSProperties, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import ImageZoom from "react-medium-image-zoom";

import getProduct from "../../queries/getProduct";
import getCartItems from "../../queries/getCartItems";
import AddToCartModal from "../../components/ui/products/AddToCartModal";
import useUser from "../../hooks/useUser";

const ProductPage: React.FC = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

  const router = useRouter();
  const { product: productId } = router.query;

  const { data: product } = useQuery<Product>(["product", productId], () =>
    getProduct(productId as string)
  );
  const { data: cartItems } = useQuery<CartItem[]>("cart", () => getCartItems());

  const user = useUser();

  const carouselArrowStyle: CSSProperties = {
    position: "absolute",
    top: "45%",
    zIndex: isCartModalOpen ? 0 : 1,
    cursor: "pointer",
    height: "25px",
    width: "25px",
  };

  return (
    <>
      <AddToCartModal
        isCartModalOpen={isCartModalOpen}
        setIsCartModalOpen={setIsCartModalOpen}
        product={product}
      />
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
              <ImageZoom key={index + Date.now()}>
                <img
                  src={image}
                  alt={product.name}
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </ImageZoom>
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
            <p>
              Price:{" "}
              <span className={product.discount ? "discounted" : ""}>
                HK${product.price.toFixed(2)}
              </span>
              {product.discount ? (
                <span className="discount">
                  {" "}
                  HK${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                </span>
              ) : (
                ""
              )}
            </p>
            {cartItems.length > 0 &&
            cartItems.some((cartItem) => cartItem.product.id === product.id) ? (
              <button className="add-cart-btn in-cart-btn" disabled>
                In Cart Already
              </button>
            ) : (
              <button
                className="add-cart-btn"
                onClick={() => setIsCartModalOpen(true)}
                disabled={product.amtLeft <= 0 || !user}
              >
                {!user ? "Login to Use Cart" : product.amtLeft ? "Add to Cart" : "Sold Out"}
              </button>
            )}
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

        .add-cart-btn {
          width: 100%;
          padding: 5px 0;
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

        .in-cart-btn {
          background: var(--secondaryColor) !important;
        }

        .secondary-text {
          color: var(--secondaryTextColor);
        }

        .remarks {
          font-size: 0.85rem;
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
  await queryClient.prefetchQuery("cart", () => getCartItems(ctx));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductPage;
