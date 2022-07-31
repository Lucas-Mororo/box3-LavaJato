import React from "react";
import { Servicos } from "../../../models/servicos";
import FormularioView from "./Formulario.view";

function Formulario(props: { setOpen: any }): React.ReactElement {
    return (
        <FormularioView setOpen={props.setOpen} />
    );
}

export default Formulario;
