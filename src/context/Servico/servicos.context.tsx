/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ServicosContextType } from "./models/PropsServicosContext";
import { Servicos } from "../../models/servicos";
import { INI_VALUES } from "./defaults";
// import { deletePublication, getPublicationsProfile } from "services/Publicacoes";
// import { usePortfolio } from "context/Portfolio";
// import Notify from "../../utils/Notification";
import appReducer from "./AppReducerServicos";
import Notify from "../../utils/Notification";

type ChildrenProps = {
	children: React.ReactNode;
};

export const ServicosContext = React.createContext<ServicosContextType>(INI_VALUES);

export const ServicossProvider = ({ children }: ChildrenProps) => {
	const [servicos, setServicos] = React.useState<Servicos[]>([]);
	// const [verification, setVerification] = React.useState<boolean>(true);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialState = { servicos: [] };
	const [stateReducer, dispatch] = React.useReducer(appReducer, initialState);

	function deleteServico(id: number) {
		if (window.confirm("Deseja deletar esta mservico?")) {
			Notify("Evento deletado com sucesso!");
			dispatch({
				type: "DELETE",
				payload: id,
			});
		}
	}

	function updateServico(updatedServic: Servicos) {
		dispatch({
			type: "UPDATE",
			payload: updatedServic,
		});
	}

	function addServico(addServic: any) {
		dispatch({
			type: "ADD",
			payload: addServic,
		});
	}


	useEffect(() => {
		setServicos([
			{
                servico: "Cristalização de vidros",
                descricao: "Cristaliza os vidros do seu veículo para deixalos brilhantes",
                valor: "50,00",
                id: 0,
            },
			{
                servico: "Higienização de ar-condicionado",
                descricao: "Limpeza do ar condicionado do veículo",
                valor: "22,50",
                id: 1,
            },
			{
                servico: "Lavagem completa",
                descricao: "Lavar o carro com água e sabão, lavar rodas, lavar motor e passar cera na hora da secagem.",
                valor: "120,00",
                id: 2,
            },
			{
                servico: "Lavagem simples",
                descricao: "Lavar o carro com água e sabão, não lavar rodas, não lavar motor, não passar cera na hora da secagem.",
                valor: "40,00",
                id: 3,
            },
			{
                servico: "Limpeza técnica de motor",
                descricao: "Limpeza do motor.",
                valor: "120,00",
                id: 4,
            },
			{
                servico: "Polimento de faróis",
                descricao: "Polir os faróis.",
                valor: "30,00",
                id: 5,
            },
		])
		dispatch({
			type: "INITIALIZING",
			payload: {
				...initialState,
				servicos: [
					{
						servico: "Cristalização de vidros",
						descricao: "Cristaliza os vidros do seu veículo para deixalos brilhantes",
						valor: "50,00",
						id: 0,
					},
					{
						servico: "Higienização de ar-condicionado",
						descricao: "Limpeza do ar condicionado do veículo",
						valor: "22,50",
						id: 1,
					},
					{
						servico: "Lavagem completa",
						descricao: "Lavar o carro com água e sabão, lavar rodas, lavar motor e passar cera na hora da secagem.",
						valor: "120,00",
						id: 2,
					},
					{
						servico: "Lavagem simples",
						descricao: "Lavar o carro com água e sabão, não lavar rodas, não lavar motor, não passar cera na hora da secagem.",
						valor: "40,00",
						id: 3,
					},
					{
						servico: "Limpeza técnica de motor",
						descricao: "Limpeza do motor.",
						valor: "120,00",
						id: 4,
					},
					{
						servico: "Polimento de faróis",
						descricao: "Polir os faróis.",
						valor: "30,00",
						id: 5,
					},
				]
			}
		})
	}, [])

	return (
		<ServicosContext.Provider
			value={{
				servicos,
				setServicos,
				stateReducer,
				deleteServico,
				updateServico,
				addServico,
				// verification,
				// setVerification,
			}}
		>
			{children}
		</ServicosContext.Provider>
	);
};
