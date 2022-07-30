import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TableClientes from '../pages/TableClientes';
import TableMarcas from '../pages/TableMarcas';
import TableModelos from '../pages/TableModelos';
import TableServicos from '../pages/TableServicos';

const PublicRouter = (): React.ReactElement => {

    return (
        <Routes>
            <Route path="/" element={<TableClientes />} />
            <Route path="/LavaJato/Marcas" element={<TableMarcas />} />
            <Route path="/LavaJato/Modelos" element={<TableModelos />} />
            <Route path="/LavaJato/Clientes" element={<TableClientes />} />
            <Route path="/LavaJato/Servicos" element={<TableServicos />} />
        </Routes>
    );
}

export default PublicRouter;
