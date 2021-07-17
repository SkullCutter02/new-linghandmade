import React from "react";
import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  error: FieldError;
  register: any;
  height?: number;
  isRequired?: boolean;
  defaultValue?: string;
}

const TextareaControl: React.FC<Props> = ({
  name,
  label,
  error,
  register,
  height = 150,
  isRequired = true,
  defaultValue,
}) => {
  return (
    <>
      <FormControl id={name} isInvalid={!!error?.message} isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
        <Textarea
          resize={"none"}
          height={height + "px"}
          defaultValue={defaultValue}
          {...register(name)}
        />
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default TextareaControl;
