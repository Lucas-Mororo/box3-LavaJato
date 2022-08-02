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
		const atendimentos = localStorage.getItem("@atendimentos");

		if (atendimentos) {
			setAtendimentos([JSON.parse(atendimentos)])
			dispatch({
				type: "INITIALIZING",
				payload: {
					...initialState,
					atendimentos: JSON.parse(atendimentos)
				}
			})
		} else {
			setAtendimentos([
				{
					CEP: "62010-585",
					bairro: "Centro",
					cidade: "Sobral",
					cliente: "LucasMMMMMMMMMMMMMMMMM",
					complemento: "3asd",
					dataF: undefined,
					dataI: "2022-08-01T18:21",
					estado: "CE",
					id: 1,
					logradouro: "Rua Luiz Gonzaga Prado",
					marca: "Chevrolet",
					modelo: "Camaro",
					numero: "4",
					placa: "ASD234",
					servicos: [
						{
							id: 2,
							servico: "Higienização de ar-condicionado",
							valor: 22.5,
						},
						{
							id: 4,
							servico: "Lavagem simples",
							valor: 40,
						}
					],
					state: true,
					idCliente: 2,
					telefone: "(11)11111-1111",
					valor: 62.5,
				}
			])
			dispatch({
				type: "INITIALIZING",
				payload: {
					...initialState,
					atendimentos: [
						{
							CEP: "62010-585",
							bairro: "Centro",
							cidade: "Sobral",
							cliente: "LucasMMMMMMMMMMMMMMMMM",
							complemento: "3asd",
							dataF: undefined,
							dataI: "2022-08-01T18:21",
							estado: "CE",
							id: 1,
							logradouro: "Rua Luiz Gonzaga Prado",
							marca: "Chevrolet",
							modelo: "Camaro",
							numero: "4",
							placa: "ASD234",
							servicos: [
								{
									id: 2,
									servico: "Higienização de ar-condicionado",
									valor: 22.5,
								},
								{
									id: 4,
									servico: "Lavagem simples",
									valor: 40,
								}
							],
							state: true,
							idCliente: 2,
							telefone: "(11)11111-1111",
							valor: 62.5,
						}
					]
				}
			})
		}
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
