import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  error: FieldError;
  register: any;
  defaultValue?: number;
  min?: number;
  max?: number;
  precision?: number;
  isRequired?: boolean;
}

const NumberInputControl: React.FC<Props> = ({
  name,
  label,
  error,
  register,
  defaultValue,
  min,
  max,
  precision,
  isRequired = true,
}) => {
  return (
    <>
      <FormControl id={name} isInvalid={!!error?.message} isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
        <NumberInput defaultValue={defaultValue} min={min} max={max} precision={precision}>
          <NumberInputField {...register(name)} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default NumberInputControl;
