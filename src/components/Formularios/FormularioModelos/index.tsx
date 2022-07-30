import React from "react";
import { Modelos } from "../../../models/modelos";
import FormularioView from "./Formulario.view";

function Formulario(props: { action: string; id: number, modelos: Modelos[], setOpen: any}): React.ReactElement {
    return (
        <FormularioView action={props.action} id={props.id} modelos={props.modelos} setOpen={props.setOpen} />
    );
}

export default Formulario;
