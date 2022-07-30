import { Box } from "@material-ui/core";
import React from "react";
import TabelasMarcas from "../../components/Tabelas/TabelasMarcas";

export default function TableMarcas(): React.ReactElement {
  return (
    <>
      <Box style={{width: "100%", display: "center", alignItems: "center", justifyContent: "center", margin: "0px"}}>
        <TabelasMarcas />
      </Box>
    </>
  );
}
