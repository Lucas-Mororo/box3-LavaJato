/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ServicosAtendimentosContextType } from "./models/PropsServicosContext";
import { ServicosAtendimentos } from "../../models/servicos";
import { INI_VALUES } from "./defaults";
// import { deletePublication, getPublicationsProfile } from "services/Publicacoes";
// import { usePortfolio } from "context/Portfolio";
// import Notify from "../../utils/Notification";
import appReducer from "./AppReducerServicos";
import Notify from "../../utils/Notification";

type ChildrenProps = {
	children: React.ReactNode;
};

export const ServicosAtendimentosContext = React.createContext<ServicosAtendimentosContextType>(INI_VALUES);

export const ServicosAtendimentossProvider = ({ children }: ChildrenProps) => {
	const [servicosAtendimentos, setServicosAtendimentos] = React.useState<ServicosAtendimentos[]>([]);
	const initialState = { servicosAtendimentos: [] };
	const [stateReducerServicoAtendimentos, dispatch] = React.useReducer(appReducer, initialState);

	function deleteServicoAtendimento(id: number) {
		if (window.confirm("Deseja deletar esta servico?")) {
			// Notify("Evento deletado com sucesso!");
			dispatch({
				type: "DELETE",
				payload: id,
			});
		}
	}

	function deleteAllServicoAtendimento() {
		dispatch({
			type: "DELETEAll",
			payload: 0,
		});
	}

	function addServicoAtendimento(addServic: any) {
		dispatch({
			type: "ADD",
			payload: addServic,
		});
	}

	return (
		<ServicosAtendimentosContext.Provider
			value={{
				servicosAtendimentos,
				setServicosAtendimentos,
				stateReducerServicoAtendimentos,
				deleteServicoAtendimento,
				addServicoAtendimento,
				deleteAllServicoAtendimento,
				// verification,
				// setVerification,
			}}
		>
			{children}
		</ServicosAtendimentosContext.Provider>
	);
};
