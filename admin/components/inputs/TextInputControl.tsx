import React from "react";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  error: FieldError;
  register: any;
  isRequired?: boolean;
}

const TextInputControl: React.FC<Props> = ({ name, label, error, register, isRequired = true }) => {
  return (
    <>
      <FormControl id={name} isInvalid={!!error?.message} isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
        <Input type={"text"} {...register(name)} />
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default TextInputControl;
