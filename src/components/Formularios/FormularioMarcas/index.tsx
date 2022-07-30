import React from "react";
import { Marcas } from "../../../models/marcas";
import FormularioView from "./Formulario.view";

function Formulario(props: { action: string; id: number, marcas: Marcas[], setOpen: any}): React.ReactElement {
    return (
        <FormularioView action={props.action} id={props.id} marcas={props.marcas} setOpen={props.setOpen} />
    );
}

export default Formulario;
