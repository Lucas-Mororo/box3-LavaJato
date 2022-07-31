import React from "react";
import { Atendimentos, AtendimentosReducer} from "../../../models/atendimento";

export type AtendimentoContextType = {
	atendimentos: Atendimentos[];
	setAtendimentos: React.Dispatch<React.SetStateAction<Atendimentos[]>>;
	// verification: boolean;
	// setVerification: React.Dispatch<React.SetStateAction<boolean>>;
	stateReducerAtendimentos: AtendimentosReducer;
	deleteAtendimento: (id: number) => void;
	updateAtendimento: (updatedServico: any) => void;
	addAtendimento: (addServico: any) => void;
};
