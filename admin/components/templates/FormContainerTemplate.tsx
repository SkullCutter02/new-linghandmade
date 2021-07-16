import React from "react";
import { VStack } from "@chakra-ui/react";

interface Props {
  handleSubmit: any;
  submitFn: any;
}

const FormContainerTemplate: React.FC<Props> = ({ handleSubmit, submitFn, children }) => {
  return (
    <>
      <VStack
        as={"form"}
        spacing={"20px"}
        width={"50%"}
        minW={"300px"}
        margin={"50px auto"}
        onSubmit={handleSubmit(submitFn)}
      >
        {children}
      </VStack>
    </>
  );
};

export default FormContainerTemplate;
