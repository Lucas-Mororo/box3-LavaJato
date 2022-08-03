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
					CEP: "62010-460",
					bairro: "Centro",
					cidade: "Sobral",
					cliente: "Isaac Daniel Bezerra da Silva",
					complemento: "AP",
					dataF: undefined,
					dataI: "2022-08-03T12:09:10",
					estado: "CE",
					id: 1,
					idCliente: 1,
					logradouro: "Travessa Adriano Dias de Carvalho",
					marca: "Fiat",
					modelo: "Cronos",
					numero: "014",
					placa: "AVA-2154",
					servicos: [
						{
							servico: 'Cristalização de vidros',
							valor: 50,
							id: 1
						},
						{
							servico: 'Lavagem completa',
							valor: 120,
							id: 3
						}
					],
					state: true,
					telefone: "(88)99790-8018",
					valor: 170,
				},
				{
					CEP: "62010-420",
					bairro: "Centro",
					cidade: "Sobral",
					cliente: "Lucas Martins Mororó",
					complemento: "AP",
					dataF: "2022-07-03T17:30:00",
					dataI: "2022-07-03T17:10:18",
					estado: "CE",
					id: 2,
					idCliente: 2,
					logradouro: "Rua Afonso Ligório Rodrigues",
					marca: "Chevrolet",
					modelo: "Tracker",
					numero: "180",
					placa: "AVA-2154",
					servicos: [
						{
							id: 4,
							servico: "Lavagem simples",
							valor: 40,
						},
						{
							id: 6,
							servico: "Polimento de faróis",
							valor: 30,
						}
					],
					state: false,
					telefone: "(11)11111-1111",
					valor: 70,
				},
				{
					CEP: "62010-490",
					bairro: "Centro",
					cidade: "Sobral",
					cliente: "Andesson Araujo",
					complemento: "AP",
					dataF: "2022-08-01T17:45:00",
					dataI: "2022-08-01T17:10:00",
					estado: "CE",
					id: 3,
					idCliente: 3,
					logradouro: "Vila Alegre",
					marca: "Fiat",
					modelo: "Uno",
					numero: "3",
					placa: "AVA-2154",
					servicos: [
						{
							id: 6,
							servico: "Polimento de faróis",
							valor: 30,
						},
						{
							id: 4,
							servico: "Lavagem simples",
							valor: 40,
						}
					],
					state: false,
					telefone: "(22)22222-2222",
					valor: 70,
				},
				{
					CEP: "62011-000",
					bairro: "Centro",
					cidade: "Sobral",
					cliente: "Renan Carlos Mesquita",
					complemento: "AP",
					dataF: "2022-07-12T12:45:00",
					dataI: "2022-07-12T12:10:00",
					estado: "CE",
					id: 4,
					idCliente: 4,
					logradouro: "Rua Anahid Andrade",
					marca: "Fiat",
					modelo: "Cronos",
					numero: "55",
					placa: "AVA-2154",
					servicos: [
						{
							id: 2,
							servico: "Higienização de ar-condicionado",
							valor: 22.5,
						},
						{
							id: 3,
							servico: "Lavagem completa",
							valor: 120,
						}
					],
					state: false,
					telefone: "(33)33333-3333",
					valor: 142.5,
				}
			])
			dispatch({
				type: "INITIALIZING",
				payload: {
					...initialState,
					atendimentos: [
						{
							CEP: "62010-460",
							bairro: "Centro",
							cidade: "Sobral",
							cliente: "Isaac Daniel Bezerra da Silva",
							complemento: "AP",
							dataF: undefined,
							dataI: "2022-08-03T12:09:10",
							estado: "CE",
							id: 1,
							idCliente: 1,
							logradouro: "Travessa Adriano Dias de Carvalho",
							marca: "Fiat",
							modelo: "Cronos",
							numero: "014",
							placa: "AVA-2154",
							servicos: [
								{
									servico: 'Cristalização de vidros',
									valor: 50,
									id: 1
								},
								{
									servico: 'Lavagem completa',
									valor: 120,
									id: 3
								}
							],
							state: true,
							telefone: "(88)99790-8018",
							valor: 170,
						},
						{
							CEP: "62010-420",
							bairro: "Centro",
							cidade: "Sobral",
							cliente: "Lucas Martins Mororó",
							complemento: "AP",
							dataF: "2022-07-03T17:30:00",
							dataI: "2022-07-03T17:10:00",
							estado: "CE",
							id: 2,
							idCliente: 2,
							logradouro: "Rua Afonso Ligório Rodrigues",
							marca: "Chevrolet",
							modelo: "Tracker",
							numero: "180",
							placa: "AVA-2154",
							servicos: [
								{
									id: 4,
									servico: "Lavagem simples",
									valor: 40,
								},
								{
									id: 6,
									servico: "Polimento de faróis",
									valor: 30,
								}
							],
							state: false,
							telefone: "(11)11111-1111",
							valor: 70,
						},
						{
							CEP: "62010-490",
							bairro: "Centro",
							cidade: "Sobral",
							cliente: "Andesson Araujo",
							complemento: "AP",
							dataF: "2022-08-01T17:45:00",
							dataI: "2022-08-01T17:10:00",
							estado: "CE",
							id: 3,
							idCliente: 3,
							logradouro: "Vila Alegre",
							marca: "Fiat",
							modelo: "Uno",
							numero: "3",
							placa: "AVA-2154",
							servicos: [
								{
									id: 6,
									servico: "Polimento de faróis",
									valor: 30,
								},
								{
									id: 4,
									servico: "Lavagem simples",
									valor: 40,
								}
							],
							state: false,
							telefone: "(22)22222-2222",
							valor: 70,
						},
						{
							CEP: "62011-000",
							bairro: "Centro",
							cidade: "Sobral",
							cliente: "Renan Carlos Mesquita",
							complemento: "AP",
							dataF: "2022-07-12T12:45:00",
							dataI: "2022-07-12T12:10:00",
							estado: "CE",
							id: 4,
							idCliente: 4,
							logradouro: "Rua Anahid Andrade",
							marca: "Fiat",
							modelo: "Cronos",
							numero: "55",
							placa: "AVA-2154",
							servicos: [
								{
									id: 2,
									servico: "Higienização de ar-condicionado",
									valor: 22.5,
								},
								{
									id: 3,
									servico: "Lavagem completa",
									valor: 120,
								}
							],
							state: false,
							telefone: "(33)33333-3333",
							valor: 142.5,
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
