import React, { MutableRefObject } from "react";
import { Button, Heading, VStack } from "@chakra-ui/react";

interface Props {
  handleSubmit: any;
  submitFn: any;
  heading: string;
  buttonText: string;
  isLoading: boolean;
  errMsgRef: MutableRefObject<HTMLParagraphElement>;
}

const FormContainerTemplate: React.FC<Props> = ({
  handleSubmit,
  submitFn,
  heading,
  buttonText,
  isLoading,
  errMsgRef,
  children,
}) => {
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
        <Heading fontSize={"1.7rem"}>{heading}</Heading>

        {children}

        <Button type={"submit"} colorScheme={"teal"} isLoading={isLoading}>
          {buttonText}
        </Button>

        <p className="err-msg" ref={errMsgRef} />
      </VStack>
    </>
  );
};

export default FormContainerTemplate;
