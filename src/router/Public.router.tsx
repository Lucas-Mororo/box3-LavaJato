import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TableClientes from '../pages/TableClientes';

const PublicRouter = (): React.ReactElement => {

    return (
        <Routes>
            <Route path="/" element={<TableClientes />} />
            <Route path="/aaa" element={<>asdasd</>} />
        </Routes>
    );
}

export default PublicRouter;
