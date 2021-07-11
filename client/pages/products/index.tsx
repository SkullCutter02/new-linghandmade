import React, { ChangeEventHandler, useRef } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import Select from "react-select";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ProductPreview from "../../components/ui/shared/ProductPreview";
import IconInput from "../../components/widgets/IconInput";
import getProducts from "../../queries/getProducts";
import getCategories from "../../queries/getCategories";
import capitalise from "../../utils/capitalise";

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const { page, filter, category } = router.query;

  const searchRef = useRef<HTMLInputElement>(null);

  const { data: products } = useQuery<Product[]>(["products", page, filter], () =>
    getProducts(parseInt(page as string), filter as string, category as string)
  );

  const { data: categories } = useQuery<Category[]>("categories", getCategories);

  const search: ChangeEventHandler<HTMLInputElement> = async (e) => {
    await router.push(`/products?page=${page}&filter=${e.target.value}`);
  };

  const searchByCategory = async (v: SelectOptions) => {
    if (!v) await router.push(`/products?page=${page}&filter=${searchRef.current.value}`);
    else
      await router.push(
        `/products?page=${page}&filter=${searchRef.current.value}&category=${v.value}`
      );
  };

  return (
    <>
      <div className="products-container">
        <div className="products-topbar">
          <h2>Products</h2>
          <Select
            placeholder={"Search by Category"}
            options={categories.map((category) => {
              return { label: capitalise(category.name), value: category.id };
            })}
            onChange={searchByCategory}
            isClearable
            isSearchable
          />
          <IconInput
            name={""}
            icon={faSearch}
            placeholder={"Search"}
            onChange={search}
            defaultValue={filter as string}
            inputRef={searchRef}
          />
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
    getProducts(
      parseInt(ctx.query.page as string),
      ctx.query.filter as string,
      ctx.query.category as string
    )
  );
  await queryClient.prefetchQuery("categories", getCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductsPage;
