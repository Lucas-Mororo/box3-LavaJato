import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TableClientes from '../pages/TableClientes';
import TableMarcas from '../pages/TableMarcas';

const PublicRouter = (): React.ReactElement => {

    return (
        <Routes>
            <Route path="/" element={<TableClientes />} />
            <Route path="/LavaJato/Marcas" element={<TableMarcas />} />
        </Routes>
    );
}

export default PublicRouter;
