import React from "react";
import { Modelos } from "../../../models/modelos";
import DialogView from "./Dialog.view";

export default function Dialog(props: { action: string; id: number, modelos: Modelos[]}): React.ReactElement {
	return (
		<DialogView action={props.action} id={props.id} modelos={props.modelos} />
	);
}
