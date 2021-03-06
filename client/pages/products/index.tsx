import React, { ChangeEventHandler, useRef } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import Select from "react-select";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ProductPreview from "../../components/ui/products/ProductPreview";
import IconInput from "../../components/widgets/IconInput";
import getProducts from "../../queries/getProducts";
import getCategories from "../../queries/getCategories";
import capitalise from "../../utils/capitalise";
import { Product } from "../../types/product";
import { Category } from "../../types/category";

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const { page, filter, category } = router.query;

  const searchRef = useRef<HTMLInputElement>(null);

  const { data: productsData } = useQuery<{ products: Product[]; hasMore: boolean }>(
    ["products", page, filter],
    () => getProducts(parseInt(page as string), filter as string, category as string)
  );

  const { data: categories } = useQuery<Category[]>("categories", getCategories);

  const search: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTimeout(async () => {
      await router.push(
        `/products?page=1&filter=${e.target.value}${category ? `&category=${category}` : ""}`
      );
    }, 400);
  };

  const searchByCategory = async (v: SelectOptions<string>) => {
    if (!v) await router.push(`/products?page=1&filter=${searchRef.current.value}`);
    else
      await router.push(`/products?page=1&filter=${searchRef.current.value}&category=${v.value}`);
  };

  return (
    <>
      <div className="products-container">
        <div className="products-topbar">
          <h2>Products</h2>
          <div className="products-filters">
            <Select
              placeholder={"Search by Category"}
              options={categories.map((c) => {
                return { label: capitalise(c.name), value: c.id };
              })}
              defaultValue={categories
                .filter((c) => c.id === category)
                .map((c) => {
                  return { label: capitalise(c.name), value: c.id };
                })}
              onChange={searchByCategory}
              className="category-filter"
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
        </div>

        <div className="products">
          {productsData.products.map((product) => (
            <ProductPreview product={product} key={product.id} />
          ))}
        </div>

        <div className="pagination-buttons">
          <button
            onClick={() =>
              router.push(
                `/products?page=${Math.max(1, parseInt(page as string) - 1)}&filter=${
                  searchRef.current.value
                }${category ? `&category=${category}` : ""}`
              )
            }
            disabled={parseInt(page as string) === 1}
          >
            Previous Page
          </button>
          <button
            onClick={() =>
              router.push(
                `/products?page=${parseInt(page as string) + 1}&filter=${searchRef.current.value}${
                  category ? `&category=${category}` : ""
                }`
              )
            }
            disabled={!productsData.hasMore}
          >
            Next Page
          </button>
        </div>
      </div>

      <style jsx>{`
        .products-container {
          width: 90%;
          margin: 30px auto;
        }

        .products-topbar {
          display: flex;
          justify-content: space-between;
        }

        .products-filters {
          display: flex;
          justify-content: space-between;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-column-gap: 30px;
          grid-row-gap: 20px;
          margin-top: 20px;
        }

        .pagination-buttons {
          margin-top: 30px;
          display: flex;
          justify-content: flex-end;
        }

        .pagination-buttons button {
          margin-right: 30px;
          background: #d7d7d7;
          border: none;
          padding: 4px 7px;
          border-radius: 8px;
        }

        .pagination-buttons button:disabled {
          display: none;
        }

        @media screen and (max-width: 900px) {
          .products {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media screen and (max-width: 790px) {
          .products-topbar {
            flex-direction: column;
          }

          .products-filters {
            margin-top: 30px;
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
