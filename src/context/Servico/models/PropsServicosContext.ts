import React from "react";
import { Servicos, ServicosReducer } from "../../../models/servicos";

export type ServicosContextType = {
	servicos: Servicos[];
	setServicos: React.Dispatch<React.SetStateAction<Servicos[]>>;
	// verification: boolean;
	// setVerification: React.Dispatch<React.SetStateAction<boolean>>;
	stateReducerServico: ServicosReducer;
	deleteServico: (id: number) => void;
	updateServico: (updatedServico: any) => void;
	addServico: (addServico: any) => void;
};
