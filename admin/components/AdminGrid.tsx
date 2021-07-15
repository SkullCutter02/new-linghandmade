import React from "react";
import { Grid, Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface Props {
  columns?: number;
  template?: string;
  isHeader?: boolean;
}

const AdminGrid: React.FC<Props> = ({ children, columns, template, isHeader }) => {
  return (
    <>
      <Grid
        width={"100%"}
        height={"50px"}
        templateColumns={template ? `${template} 0.2fr 0.2fr` : `repeat(${columns + 2}, 1fr)`}
        spacingX={"20px"}
        borderBottom={"1px solid #f5f5f6"}
      >
        {children}
        {!isHeader && (
          <>
            <Center>
              <FontAwesomeIcon icon={faPencilAlt} style={{ cursor: "pointer" }} />
            </Center>
            <Center>
              <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: "pointer" }} />
            </Center>
          </>
        )}
      </Grid>
    </>
  );
};

export default AdminGrid;
