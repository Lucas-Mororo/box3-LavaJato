import React from "react";
import { Atendimentos } from "../../../../models/atendimento";
import FormularioView from "./Formulario.view";

export default function FormularioAlteracao(props: { id: number, atendimentos: Atendimentos[], setOpen: any}): React.ReactElement {
    return (
        <FormularioView id={props.id} atendimentos={props.atendimentos} setOpen={props.setOpen} />
    );
}