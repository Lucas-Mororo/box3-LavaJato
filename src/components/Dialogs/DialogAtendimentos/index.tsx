import React from "react";
import { Atendimentos } from "../../../models/atendimento";
import DialogView from "./Dialog.view";

export default function Dialog(props: { action: string; id: number, atendimentos: Atendimentos[]}): React.ReactElement {
	return (
		<DialogView action={props.action} id={props.id} atendimentos={props.atendimentos} />
	);
}
