import React from "react";
import { Atendimentos } from "../../../models/atendimento";
import FormularioView from "./Formulario.view";

function Formulario(props: { action: string; id: number, atendimentos: Atendimentos[], setOpen: any}): React.ReactElement {
    return (
        <FormularioView action={props.action} id={props.id} atendimentos={props.atendimentos} setOpen={props.setOpen} />
    );
}

export default Formulario;
