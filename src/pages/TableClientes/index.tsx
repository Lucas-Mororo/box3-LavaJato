import { Box } from "@material-ui/core";
import React from "react";
import TabelaClientes from "../../components/Tabelas/TabelasClientes";
// import TabelasMarcas from "../../components/Tabelas/TabelasMarcas";
import { ClientesProvider } from '../../context/Usuarios/clientes.context';
import { MarcassProvider } from '../../context/Marca/marcas.context';

export default function TableClientes(): React.ReactElement {
    return (
        <>
            <ClientesProvider>
                <MarcassProvider>
                    <Box>
                        <TabelaClientes />
                        {/* <TabelasMarcas /> */}
                    </Box>
                </MarcassProvider>
            </ClientesProvider>
        </>
    )
}
