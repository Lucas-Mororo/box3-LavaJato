import { Box } from "@material-ui/core";
import React from "react";
import TabelasServicos from "../../components/Tabelas/TabelasServicos";
import TabelasServicosAtendimento from "../../components/Tabelas/TabelasServicosAtendimento";

export default function TableServicosAtendimentos(): React.ReactElement {
  return (
    <>
      <Box>
        <TabelasServicosAtendimento />
      </Box>
    </>
  );
}
