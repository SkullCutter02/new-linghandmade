import React from "react";
import { FormControl, FormErrorMessage, FormLabel, Switch } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  error: FieldError;
  register: any;
  isRequired?: boolean;
  defaultChecked?: boolean;
}

const SwitchControl: React.FC<Props> = ({
  name,
  label,
  error,
  register,
  isRequired,
  defaultChecked = false,
}) => {
  return (
    <>
      <FormControl
        id={name}
        isInvalid={!!error?.message}
        isRequired={isRequired}
        display={"flex"}
        alignItems={"center"}
      >
        <FormLabel marginBottom={0}>{label}</FormLabel>
        <Switch defaultChecked={defaultChecked} {...register(name)} />
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default SwitchControl;
