import { Box } from "@material-ui/core";
import React from "react";
import TabelaClientes from "../../components/Tabelas/TabelasClientes";

export default function TableClientes(): React.ReactElement {
  return (
    <>
      <Box>
        <TabelaClientes />
      </Box>
    </>
  );
}
