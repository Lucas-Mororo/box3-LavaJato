import React from "react";
import { Clientes } from "../../models/clientes";
import DialogView from "./Dialog.view";

export default function Dialog(props: { action: string; id: number, clientes: Clientes[]}): React.ReactElement {
	return (
		<DialogView action={props.action} id={props.id} clientes={props.clientes} />
	);
}
