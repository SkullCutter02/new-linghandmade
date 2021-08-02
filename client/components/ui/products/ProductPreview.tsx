import React from "react";
import Link from "next/link";

interface Props {
  product: Product;
}

const ProductPreview: React.FC<Props> = ({ product }) => {
  return (
    <>
      <div className="product">
        <div className="product-img">
          <div className="overlay" />
          <Link href={`/products/${product.id}`}>
            <p className="learn-more">Learn More</p>
          </Link>
          <img src={product.mainImgUrl} alt={product.name} />
        </div>
        <Link href={`/products/${product.id}`}>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>${(product.price * ((100 - product.discount) / 100)).toFixed(2)}</p>
          </div>
        </Link>
      </div>

      <style jsx>{`
        .product {
          width: 100%;
          height: 100%;
          padding: 20px 0;
        }

        .product-img {
          width: 100%;
          height: 80%;
          border: 3px solid var(--secondaryColor);
          position: relative;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: #000;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .product-img:hover .overlay {
          opacity: 40%;
        }

        .learn-more {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 3px solid var(--secondaryColor);
          background: var(--secondaryColor);
          padding: 7px 12px;
          color: #000;
          cursor: pointer;
          text-transform: uppercase;
          opacity: 0;
          transition: all 0.4s;
          font-size: 0.9rem;
          text-align: center;
        }

        .product-img:hover .learn-more {
          opacity: 100%;
        }

        .learn-more:hover {
          background: rgba(0, 0, 0, 0);
          color: #fff;
        }

        .product-img img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .product-info {
          margin-top: 15px;
        }

        .product-info h3,
        .product-info p {
          text-align: center;
          cursor: pointer;
        }

        .product-info p {
          margin-top: 3px;
        }

        @media screen and (max-width: 790px) {
          .product-info p {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default ProductPreview;
