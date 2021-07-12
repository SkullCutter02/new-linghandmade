import React from "react";
import { useQuery } from "react-query";
import Title from "../../widgets/Title";

import ProductPreview from "../products/ProductPreview";
import getFeaturedProducts from "../../../queries/getFeaturedProducts";

const FeaturedProducts: React.FC = () => {
  const { data: products } = useQuery<Product[]>("featured-products", getFeaturedProducts);

  return (
    <>
      <Title text={"Featured Products"} marginTop={30} />
      <div className="featured-products">
        {products.map((product) => (
          <ProductPreview product={product} key={product.id} />
        ))}
      </div>

      <style jsx>{`
        .featured-products {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-column-gap: 60px;
          width: 95%;
          margin: 0 auto;
          height: 370px;
        }

        @media screen and (max-width: 1000px) {
          .featured-products {
            height: 260px;
            grid-column-gap: 30px;
          }
        }

        @media screen and (max-width: 650px) {
          .featured-products {
            grid-template-columns: 1fr;
            height: auto;
            width: 75%;
          }
        }
      `}</style>
    </>
  );
};

export default FeaturedProducts;
