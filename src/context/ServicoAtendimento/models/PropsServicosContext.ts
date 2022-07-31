import React from "react";
import { ServicosAtendimentosReducer, ServicosAtendimentos } from "../../../models/servicos";

export type ServicosAtendimentosContextType = {
	servicosAtendimentos: ServicosAtendimentos[];
	setServicosAtendimentos: React.Dispatch<React.SetStateAction<ServicosAtendimentos[]>>;
	// verification: boolean;
	// setVerification: React.Dispatch<React.SetStateAction<boolean>>;
	stateReducerServicoAtendimentos: ServicosAtendimentosReducer;
	deleteServicoAtendimento: (id: number) => void;
	deleteAllServicoAtendimento: () => void;
	addServicoAtendimento: (addServico: any) => void;
};
