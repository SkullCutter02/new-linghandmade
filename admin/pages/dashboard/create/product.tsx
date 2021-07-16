import React, { useState, useRef } from "react";
import {
  FormControl,
  VStack,
  FormLabel,
  Input,
  FormErrorMessage,
  Image,
  Button,
  ButtonGroup,
  Heading,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import getCategories from "../../../queries/getCategories";
import TextInputControl from "../../../components/inputs/TextInputControl";
import TextareaControl from "../../../components/inputs/TextareaControl";
import NumberInputControl from "../../../components/inputs/NumberInputControl";
import SwitchControl from "../../../components/inputs/SwitchControl";
import { Category } from "../../../../server/src/category/entities/category.entity";
import HOST from "../../../constants/host";

interface FormInput {
  name: string;
  description: string;
  price: number;
  discount: number;
  mainImgUrl: string;
  amtLeft: number;
  featured: boolean;
  remarks: string;
  categoryId: string;
}

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
  } = useForm<FormInput>({
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
  }: FormInput) => {
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
      <VStack
        as={"form"}
        spacing={"20px"}
        width={"50%"}
        minW={"300px"}
        margin={"50px auto"}
        onSubmit={handleSubmit(createProduct)}
      >
        <Heading fontSize={"1.7rem"}>Create Product</Heading>

        <TextInputControl name={"name"} label={"Name"} error={errors.name} register={register} />

        <TextareaControl
          name={"description"}
          label={"Description"}
          error={errors.description}
          register={register}
        />

        <NumberInputControl
          name={"price"}
          label={"Price"}
          error={errors.price}
          register={register}
          defaultValue={0}
          min={0}
          precision={0.2}
        />

        <NumberInputControl
          name={"discount"}
          label={"Discount"}
          error={errors.discount}
          register={register}
          defaultValue={0}
          min={0}
          max={100}
          precision={0.2}
        />

        <FormControl id={"mainImgUrl"} isInvalid={!!errors.mainImgUrl?.message} isRequired>
          <FormLabel>Main Image Url</FormLabel>
          <Input
            type={"text"}
            {...register("mainImgUrl")}
            value={mainImg}
            onChange={(e) => setMainImg(e.target.value)}
          />
          <FormErrorMessage>{errors.mainImgUrl?.message}</FormErrorMessage>
          <Image src={mainImg} margin={"20px 0"} maxW={"50%"} />
        </FormControl>

        <FormControl id={"carouselImgUrls"}>
          <FormLabel>Carousel Image Urls</FormLabel>
          <VStack spacing={"20px"} marginBottom={"20px"}>
            {[...Array(carouselImgsLength).keys()].map((n) => (
              <Input key={n} ref={(el) => (carouselImgRefs.current[n] = el)} />
            ))}
          </VStack>
          <ButtonGroup float={"right"}>
            <Button
              size={"sm"}
              variant={"outline"}
              colorScheme={"teal"}
              onClick={() => setCarouselImgsLength((prev) => prev + 1)}
            >
              Add One
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              colorScheme={"red"}
              onClick={() => {
                setCarouselImgsLength((prev) => prev - 1);
                carouselImgRefs.current.pop();
              }}
            >
              Remove Last
            </Button>
          </ButtonGroup>
        </FormControl>

        <NumberInputControl
          name={"amtLeft"}
          label={"Amount Left"}
          error={errors.amtLeft}
          register={register}
          defaultValue={0}
          min={0}
        />

        <SwitchControl
          name={"featured"}
          label={"Featured"}
          error={errors.featured}
          register={register}
        />

        <TextareaControl
          name={"remarks"}
          label={"Remarks"}
          error={errors.remarks}
          register={register}
          height={100}
          isRequired={false}
        />

        <FormControl id={"category"} isInvalid={!!errors.categoryId?.message} isRequired>
          <FormLabel>Category</FormLabel>
          <Select placeholder={"Select Category"} {...register("categoryId")}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.categoryId?.message}</FormErrorMessage>
        </FormControl>

        <Button type={"submit"} colorScheme={"teal"} isLoading={isLoading}>
          Create
        </Button>

        <p className="err-msg" ref={errMsgRef} />
      </VStack>
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
