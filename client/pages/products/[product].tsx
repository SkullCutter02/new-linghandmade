import React, { CSSProperties } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

import getProduct from "../../queries/getProduct";

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { product: productId } = router.query;

  const { data: product } = useQuery<Product>(["product", productId], () =>
    getProduct(productId as string)
  );

  const carouselArrowStyle: CSSProperties = {
    position: "absolute",
    top: "45%",
    zIndex: 1,
    cursor: "pointer",
    height: "25px",
    width: "25px",
  };

  return (
    <>
      <div className="product">
        <div className="product-upper">
          <div className="carousel-container">
            <Carousel
              showArrows={false}
              showIndicators={false}
              thumbWidth={150}
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
                <img
                  src={image}
                  alt={product.name}
                  key={index + Date.now()}
                  style={{ height: "90%", objectFit: "cover" }}
                />
              ))}
            </Carousel>
          </div>
          <div className="text-content">
            <h1>{product.name}</h1>
            <p>${product.price}</p>
            <p>{product.amtLeft} left</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product {
          padding: 50px 5%;
        }

        .product-upper {
          display: flex;
        }

        .product-upper > * {
          width: 50%;
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
