import React, { useEffect, useState } from "react";
import { Image, Spinner, Table, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import getProducts from "../../queries/getProducts";
import DashboardHeader from "../../components/DashboardHeader";
import PaginationButtons from "../../components/PaginationButtons";

const ProductDashboardPage: React.FC = () => {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const { isLoading, data: productsData } = useQuery<{ products: Product[]; hasMore: boolean }>(
    ["products", page, filter],
    () => getProducts(page, filter)
  );

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <>
      <DashboardHeader filter={filter} setFilter={setFilter} createPageLink={"/create/product"} />
      <Table varian={"simple"}>
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th>price</Th>
            <Th>discount</Th>
            <Th>main image</Th>
            <Th>amount left</Th>
            <Th>featured</Th>
            <Th>category</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Spinner />
          ) : (
            productsData.products.map((product) => (
              <Tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>${product.price}</Td>
                <Td>{product.discount || 0}%</Td>
                <Td>
                  <Image
                    src={product.mainImgUrl}
                    alt={product.name}
                    objectFit={"cover"}
                    maxH={"80px"}
                  />
                </Td>
                <Td>{product.amtLeft}</Td>
                <Td>{product.featured ? "true" : "false"}</Td>
                <Td>{product.category.name}</Td>
                <Td>
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push(`/dashboard/edit/product/${product.id}`)}
                  />
                </Td>
                <Td>
                  <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: "pointer" }} />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <PaginationButtons hasMore={productsData?.hasMore} page={page} setPage={setPage} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["products", 1, ""], () => getProducts(1, ""));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductDashboardPage;
