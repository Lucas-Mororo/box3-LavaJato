import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import TableAtendimentos from '../pages/TableAtendimentos';
import TableClientes from '../pages/TableClientes';
import TableMarcas from '../pages/TableMarcas';
import TableModelos from '../pages/TableModelos';
import TableServicos from '../pages/TableServicos';
import TableServicosAtendimentos from '../pages/TableServicosAtendimentos';

const PublicRouter = (): React.ReactElement => {

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/LavaJato/Marcas" element={<TableMarcas />} />
            <Route path="/LavaJato/Modelos" element={<TableModelos />} />
            <Route path="/LavaJato/Clientes" element={<TableClientes />} />
            <Route path="/LavaJato/Servicos" element={<TableServicos />} />
            <Route path="/LavaJato/Atendimentos" element={<TableAtendimentos />} />
            <Route path="/LavaJato/Atendimentos/Servicos" element={<TableServicosAtendimentos />} />
        </Routes>
    );
}

export default PublicRouter;
