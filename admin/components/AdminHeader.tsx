import React from "react";
import { Center } from "@chakra-ui/react";

interface Props {
  text: string;
}

const AdminHeader: React.FC<Props> = ({ text }) => {
  return (
    <>
      <Center fontWeight={"bold"}>{text}</Center>
    </>
  );
};

export default AdminHeader;
