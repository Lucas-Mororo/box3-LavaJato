import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./core/components/Navbar/Components";
import PublicRouter from "./router/Public.router";
import { MarcasProvider } from "./context/Marca/marcas.context";
import { ClientesProvider } from "./context/Usuarios/clientes.context";
import { ModelossProvider } from "./context/Modelo/modelos.context";
import { ServicossProvider } from "./context/Servico/servicos.context";

function App(): React.ReactElement {
  return (
    <>
      <BrowserRouter>
        <ClientesProvider>
          <MarcasProvider>
            <ModelossProvider>
              <ServicossProvider>
                <Toaster position="top-right" reverseOrder={false} />
                <Navbar />
                <PublicRouter />
              </ServicossProvider>
            </ModelossProvider>
          </MarcasProvider>
        </ClientesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
