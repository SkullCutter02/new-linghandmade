import React from "react";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  error: FieldError;
  register: any;
  isRequired?: boolean;
  defaultValue?: string;
}

const TextInputControl: React.FC<Props> = ({
  name,
  label,
  error,
  register,
  isRequired = true,
  defaultValue,
}) => {
  return (
    <>
      <FormControl id={name} isInvalid={!!error?.message} isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
        <Input type={"text"} defaultValue={defaultValue} {...register(name)} />
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default TextInputControl;
