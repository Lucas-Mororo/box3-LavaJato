import React from "react";
import { Clientes } from "../../../models/clientes";
import FormularioView from "./Formulario.view";

function Formulario(props: { action: string; id: number, clientes: Clientes[], setOpen: any}): React.ReactElement {
    return (
        <FormularioView action={props.action} id={props.id} clientes={props.clientes} setOpen={props.setOpen} />
    );
}

export default Formulario;
