import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TableClientes from '../pages/TableClientes';

const PublicRouter = (): React.ReactElement => {

    return (
        <Routes>
            <Route path="/" element={<TableClientes />} />
        </Routes>
    );
}

export default PublicRouter;
