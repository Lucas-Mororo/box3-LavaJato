import React from "react";
import { Servicos } from "../../../models/servicos";
import FormularioView from "./Formulario.view";

function Formulario(props: { action: string; id: number, servicos: Servicos[], setOpen: any}): React.ReactElement {
    return (
        <FormularioView action={props.action} id={props.id} servicos={props.servicos} setOpen={props.setOpen} />
    );
}

export default Formulario;
