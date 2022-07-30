import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./core/components/Navbar/Components";
// import { Toaster } from 'react-hot-toast';
// import Navbar from "./core/components/Navbar/Components";
// import PublicRouter from "./router/Public.router";
import PublicRouter from "./router/Public.router";

function App(): React.ReactElement {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <PublicRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
