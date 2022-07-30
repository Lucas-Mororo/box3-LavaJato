import React from "react";
import { Marcas } from "../../../models/marcas";
import DialogView from "./Dialog.view";

export default function Dialog(props: { action: string; id: number, marcas: Marcas[]}): React.ReactElement {
	return (
		<DialogView action={props.action} id={props.id} marcas={props.marcas} />
	);
}
