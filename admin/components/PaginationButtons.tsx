import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const PaginationButtons: React.FC = () => {
  return (
    <>
      <ButtonGroup float={"right"} spacing={"30px"} margin={"40px 0"} size={"sm"}>
        <Button colorScheme={"blue"} variant={"outline"}>
          Previous Page
        </Button>
        <Button colorScheme={"blue"}>Next Page</Button>
      </ButtonGroup>
    </>
  );
};

export default PaginationButtons;
