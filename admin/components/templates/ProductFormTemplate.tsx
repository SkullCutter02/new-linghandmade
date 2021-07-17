import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
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
  carouselImgsLength: number;
  setCarouselImgsLength: Dispatch<SetStateAction<number>>;
  carouselImgRefs: MutableRefObject<HTMLInputElement[]>;
  categories: Category[];
  defaultCarouselImgs?: string[];
}

const ProductFormTemplate: React.FC<Props> = ({
  errors,
  register,
  mainImg,
  setMainImg,
  carouselImgsLength,
  setCarouselImgsLength,
  carouselImgRefs,
  categories,
  defaultCarouselImgs,
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
          {[...Array(carouselImgsLength).keys()].map((n) => (
            <Input
              key={n}
              defaultValue={defaultCarouselImgs && defaultCarouselImgs[n]}
              ref={(el) => (carouselImgRefs.current[n] = el)}
            />
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
    </>
  );
};

export default ProductFormTemplate;
