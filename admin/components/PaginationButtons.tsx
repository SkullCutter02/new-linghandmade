import React, { Dispatch, SetStateAction } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface Props {
  hasMore: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PaginationButtons: React.FC<Props> = ({ hasMore, page, setPage }) => {
  return (
    <>
      <ButtonGroup float={"right"} spacing={"30px"} margin={"40px 0"} size={"sm"}>
        <Button
          colorScheme={"blue"}
          variant={"outline"}
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous Page
        </Button>
        <Button
          colorScheme={"blue"}
          disabled={!hasMore}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next Page
        </Button>
      </ButtonGroup>
    </>
  );
};

export default PaginationButtons;
