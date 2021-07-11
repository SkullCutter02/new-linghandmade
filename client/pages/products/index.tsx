import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import ProductPreview from "../../components/ui/shared/ProductPreview";
import getProducts from "../../queries/getProducts";

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const { page, filter } = router.query;

  const { data: products } = useQuery<Product[]>(["products", page, filter], () =>
    getProducts(parseInt(page as string), filter as string)
  );

  return (
    <>
      <div className="products-container">
        <div className="products-topbar">
          <h2>Products</h2>
        </div>

        <div className="products">
          {products.map((product) => (
            <ProductPreview product={product} key={product.id} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .products-container {
          width: 90%;
          margin: 30px auto;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-column-gap: 30px;
          grid-row-gap: 20px;
          margin-top: 20px;
        }

        @media screen and (max-width: 900px) {
          .products {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media screen and (max-width: 650px) {
          .products {
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 15px;
            grid-auto-rows: 200px;
          }
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["products", ctx.query.page, ctx.query.filter], () =>
    getProducts(parseInt(ctx.query.page as string), ctx.query.filter as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductsPage;
