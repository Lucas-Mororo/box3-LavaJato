import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./core/components/Navbar/Components";
import PublicRouter from "./router/Public.router";
import { MarcasProvider } from "./context/Marca/marcas.context";
import { ClientesProvider } from "./context/Usuarios/clientes.context";
import { ModelossProvider } from "./context/Modelo/modelos.context";
import { ServicossProvider } from "./context/Servico/servicos.context";
import { AtendimentosProvider } from "./context/Atendimento/atendimento.context";
import { ServicosAtendimentossProvider } from "./context/ServicoAtendimento/servicosAtendimentos.context";

function App(): React.ReactElement {
  return (
    <>
      <BrowserRouter>
        <ClientesProvider>
          <MarcasProvider>
            <ModelossProvider>
              <ServicossProvider>
                <AtendimentosProvider>
                  <ServicosAtendimentossProvider>
                    <Toaster position="top-right" reverseOrder={false} />
                    <Navbar />
                    <PublicRouter />
                  </ServicosAtendimentossProvider>
                </AtendimentosProvider>
              </ServicossProvider>
            </ModelossProvider>
          </MarcasProvider>
        </ClientesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
