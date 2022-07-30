import React from "react";
import { Servicos } from "../../../models/servicos";
import DialogView from "./Dialog.view";

export default function Dialog(props: { action: string; id: number, servicos: Servicos[]}): React.ReactElement {
	return (
		<DialogView action={props.action} id={props.id} servicos={props.servicos} />
	);
}
