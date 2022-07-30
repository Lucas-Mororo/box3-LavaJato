import { Box } from "@material-ui/core";
import React from "react";
import TabelaAtendimentos from "../../components/Tabelas/TabelasAtendimentos";

export default function TableAtendimentos(): React.ReactElement {
  return (
    <>
      <Box>
        <TabelaAtendimentos />
      </Box>
    </>
  );
}
