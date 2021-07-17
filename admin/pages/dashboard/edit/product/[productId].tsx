import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import FormContainerTemplate from "../../../../components/templates/FormContainerTemplate";
import productYupResolver from "../../../../resolvers/productYupResolver";
import getProduct from "../../../../queries/getProduct";
import getCategories from "../../../../queries/getCategories";
import ProductFormTemplate from "../../../../components/templates/ProductFormTemplate";
import HOST from "../../../../constants/host";

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const { productId } = router.query;

  const { data: categories } = useQuery<Category[]>("categories", getCategories);
  const { data: product } = useQuery<Product>(["product", productId as string], () =>
    getProduct(productId as string)
  );

  const [mainImg, setMainImg] = useState<string>(product.mainImgUrl);
  const [carouselImgsLength, setCarouselImgsLength] = useState(product.carouselImgUrls.length);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const carouselImgRefs = useRef<Array<HTMLInputElement | null>>([]);
  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInput>({
    mode: "onBlur",
    resolver: productYupResolver,
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount ?? 0,
      mainImgUrl: product.mainImgUrl,
      amtLeft: product.amtLeft,
      featured: product.featured,
      remarks: product.remarks ?? "",
      categoryId: product.category.id,
    },
  });

  const editProduct = async ({
    name,
    description,
    price,
    discount,
    mainImgUrl,
    amtLeft,
    featured,
    remarks,
    categoryId,
  }: ProductFormInput) => {
    const carouselImgUrls = carouselImgRefs.current
      .filter((el) => !!el?.value)
      .map((el) => el.value);

    setIsLoading(true);
    errMsgRef.current.innerText = "";

    try {
      const res = await fetch(`${HOST}/product/${product.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          discount,
          mainImgUrl,
          carouselImgUrls,
          amtLeft,
          featured,
          remarks,
          categoryId,
        }),
      });
      const data = await res.json();

      if (res.ok) await router.push("/dashboard/product");
      else {
        setIsLoading(false);
        errMsgRef.current.innerText = data.message;
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormContainerTemplate
        handleSubmit={handleSubmit}
        submitFn={editProduct}
        heading={"Edit Product"}
        buttonText={"Update"}
        isLoading={isLoading}
        errMsgRef={errMsgRef}
      >
        <ProductFormTemplate
          errors={errors}
          register={register}
          mainImg={mainImg}
          setMainImg={setMainImg}
          carouselImgsLength={carouselImgsLength}
          setCarouselImgsLength={setCarouselImgsLength}
          carouselImgRefs={carouselImgRefs}
          categories={categories}
          defaultCarouselImgs={product.carouselImgUrls}
        />
      </FormContainerTemplate>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const productId = ctx.query.productId as string;

  await queryClient.prefetchQuery(["product", productId], () => getProduct(productId));
  await queryClient.prefetchQuery("categories", getCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default EditProductPage;
