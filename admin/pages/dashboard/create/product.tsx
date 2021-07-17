import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import getCategories from "../../../queries/getCategories";
import HOST from "../../../constants/host";
import ProductFormTemplate from "../../../components/templates/ProductFormTemplate";
import FormContainerTemplate from "../../../components/templates/FormContainerTemplate";
import productYupResolver from "../../../resolvers/productYupResolver";

const CreateProductPage: React.FC = () => {
  const [mainImg, setMainImg] = useState<string>("");
  const [carouselImgsLength, setCarouselImgsLength] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const carouselImgRefs = useRef<Array<HTMLInputElement | null>>([]);
  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const router = useRouter();

  const { data: categories } = useQuery<Category[]>("categories", getCategories);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInput>({
    mode: "onBlur",
    resolver: productYupResolver,
  });

  const createProduct = async ({
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
      const res = await fetch(`${HOST}/product`, {
        method: "POST",
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
        submitFn={createProduct}
        heading={"Create Product"}
        buttonText={"Create"}
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
        />
      </FormContainerTemplate>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("categories", getCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CreateProductPage;
