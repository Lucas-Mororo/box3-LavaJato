/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { AtendimentoContextType } from "./models/PropsAtendimentosContext";
import { Atendimentos } from "../../models/atendimento";
import { INI_VALUES } from "./defaults";
import appReducer from "./AppReducerAtendimentos";
import Notify from "../../utils/Notification";

type ChildrenProps = {
	children: React.ReactNode;
};

export const AtendimentosContext = React.createContext<AtendimentoContextType>(INI_VALUES);

export const AtendimentosProvider = ({ children }: ChildrenProps) => {
	const [atendimentos, setAtendimentos] = React.useState<Atendimentos[]>([]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialState = { atendimentos: [] };
	const [stateReducerAtendimentos, dispatch] = React.useReducer(appReducer, initialState);

	function deleteAtendimento(id: number) {
		if (window.confirm("Deseja deletar este Atendimento?")) {
			Notify("Evento deletado com sucesso!");
			dispatch({
				type: "DELETE",
				payload: id,
			});
		}
	}

	function updateAtendimento(updatedAtend: Atendimentos) {
		dispatch({
			type: "UPDATE",
			payload: updatedAtend,
		});
	}

	function addAtendimento(addAtend: any) {
		dispatch({
			type: "ADD",
			payload: addAtend,
		});
	}


	useEffect(() => {
		setAtendimentos([
			{
				dataI: "19/07/2022",
				dataF: "30/07/2022",
				cliente: "Lucas",
				telefone: "88997908018",
				marca: "Chevrolet",
				modelo: "Tracker",
				placa: "HBI423",
				CEP: "62250000",
				logradouro: "Manoel Dias",
				numero: "956",
				complemento: "AP",
				bairro: "Reino",
				cidade: "Ipu",
				estado: "CE",
				servicos: [
					{
						servico: "Cristalização de vidros",
						valor: "50,00",
						id: 1,
					},
				],
				valor: 0,
				id: 1,
				state: true,
			},
		])
		dispatch({
			type: "INITIALIZING",
			payload: {
				...initialState,
				atendimentos: [
					{
						dataI: "19/07/2022",
						dataF: "30/07/2022",
						cliente: "Lucas",
						telefone: "88997908018",
						marca: "Chevrolet",
						modelo: "Tracker",
						placa: "HBI423",
						CEP: "62250000",
						logradouro: "Manoel Dias",
						numero: "956",
						complemento: "AP",
						bairro: "Reino",
						cidade: "Ipu",
						estado: "CE",
						servicos: [
							{
								servico: "Cristalização de vidros",
								valor: "50,00",
								id: 1,
							},
						],
						valor: 0,
						id: 1,
						state: true,
					},
				]
			}
		})
	}, [])

	return (
		<AtendimentosContext.Provider
			value={{
				atendimentos,
				setAtendimentos,
				stateReducerAtendimentos,
				deleteAtendimento,
				updateAtendimento,
				addAtendimento,
				// verification,
				// setVerification,
			}}
		>
			{children}
		</AtendimentosContext.Provider>
	);
};
