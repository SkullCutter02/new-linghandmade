import React, { Dispatch, SetStateAction } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  filter?: string;
  setFilter?: Dispatch<SetStateAction<string>>;
}

const DashboardHeader: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <>
      <Flex justify={"space-between"} marginBottom={"30px"}>
        {setFilter ? (
          <Input
            width={"30%"}
            placeholder={"Search"}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        ) : (
          <div />
        )}
        <Button colorScheme={"teal"} leftIcon={<FontAwesomeIcon icon={faPlus} color={"#fff"} />}>
          Create
        </Button>
      </Flex>
    </>
  );
};

export default DashboardHeader;
