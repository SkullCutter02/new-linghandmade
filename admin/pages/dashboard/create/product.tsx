import React, { useState, useRef } from "react";
import { VStack, Button, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import getCategories from "../../../queries/getCategories";
import HOST from "../../../constants/host";
import ProductFormTemplate from "../../../components/templates/ProductFormTemplate";
import FormContainerTemplate from "../../../components/templates/FormContainerTemplate";

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
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required(),
        price: yup.number().min(0).required(),
        discount: yup.number().min(0).max(100).required(),
        mainImgUrl: yup.string().url().required(),
        amtLeft: yup.number().min(0).required(),
        featured: yup.boolean().required(),
        remarks: yup.string(),
        categoryId: yup.string().required(),
      })
    ),
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
      <FormContainerTemplate handleSubmit={handleSubmit} submitFn={createProduct}>
        <Heading fontSize={"1.7rem"}>Create Product</Heading>

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

        <Button type={"submit"} colorScheme={"teal"} isLoading={isLoading}>
          Create
        </Button>

        <p className="err-msg" ref={errMsgRef} />
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
