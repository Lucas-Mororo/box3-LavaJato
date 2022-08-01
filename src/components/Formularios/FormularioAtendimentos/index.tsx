import React from "react";
import { Atendimentos } from "../../../models/atendimento";
import FormularioView from "./Formulario.view";

function Formulario(props: { id: number, atendimentos: Atendimentos[], setOpen: any}): React.ReactElement {
    return (
        <FormularioView id={props.id} atendimentos={props.atendimentos} setOpen={props.setOpen} />
    );
}

export default Formulario;
