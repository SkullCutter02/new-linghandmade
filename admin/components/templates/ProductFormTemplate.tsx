import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
} from "@chakra-ui/react";
import { FieldErrors } from "react-hook-form";

import SwitchControl from "../inputs/SwitchControl";
import TextInputControl from "../inputs/TextInputControl";
import TextareaControl from "../inputs/TextareaControl";
import NumberInputControl from "../inputs/NumberInputControl";

interface Props {
  errors: FieldErrors<ProductFormInput>;
  register: any;
  mainImg: string;
  setMainImg: Dispatch<SetStateAction<string>>;
  categories: Category[];
  carouselImgUrls: string[];
  setCarouselImgUrls: Dispatch<SetStateAction<string[]>>;
}

const ProductFormTemplate: React.FC<Props> = ({
  errors,
  register,
  mainImg,
  setMainImg,
  categories,
  carouselImgUrls,
  setCarouselImgUrls,
}) => {
  return (
    <>
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
          {carouselImgUrls.map((img, i) => (
            <InputGroup key={i}>
              <Input
                value={img}
                onChange={(e) =>
                  setCarouselImgUrls((prev) =>
                    prev.map((s, j) => {
                      if (i === j) return e.target.value;
                      else return s;
                    })
                  )
                }
              />
              <InputRightElement>
                <Button
                  size={"xs"}
                  minW={"70px"}
                  colorScheme={"red"}
                  marginRight={"40px"}
                  fontSize={"0.8rem"}
                  variant={"ghost"}
                  onClick={() => setCarouselImgUrls((prev) => prev.filter((_, j) => i !== j))}
                >
                  Remove
                </Button>
              </InputRightElement>
            </InputGroup>
          ))}
        </VStack>
        <Button
          variant={"outline"}
          colorScheme={"teal"}
          float={"right"}
          onClick={() => setCarouselImgUrls((prev) => [...prev, ""])}
        >
          Add One
        </Button>
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
    </>
  );
};

export default ProductFormTemplate;
