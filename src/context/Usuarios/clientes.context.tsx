/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ClientesContextType } from "./models/PropsClientesContext";
import { Clientes } from "../../models/clientes";
import { INI_VALUES } from "./defaults";
// import { deletePublication, getPublicationsProfile } from "services/Publicacoes";
// import { usePortfolio } from "context/Portfolio";
// import Notify from "../../utils/Notification";
import appReducer from "./AppReducerClientes";
import Notify from "../../utils/Notification";

type ChildrenProps = {
	children: React.ReactNode;
};

export const ClientesContext = React.createContext<ClientesContextType>(INI_VALUES);

export const ClientesProvider = ({ children }: ChildrenProps) => {
	const [clientes, setClientes] = React.useState<Clientes[]>([]);
	const initialState = { clientes: [] };
	const [stateReducer, dispatch] = React.useReducer(appReducer, initialState);

	function deleteClient(id: number) {
		if (window.confirm("Deseja deletar este Cliente?")) {
			Notify("Cliente deletado com sucesso!");
			dispatch({
				type: "DELETE",
				payload: id,
			});
		}
	}


	function updateClient(updatedClient: Clientes) {
		dispatch({
			type: "UPDATE",
			payload: updatedClient,
		});
	}

	function addClient(addClient: any) {
		dispatch({
			type: "ADD",
			payload: addClient,
		});
	}

	useEffect(() => {
		const clientes = localStorage.getItem("@clientes");

		if (clientes) {
			setClientes([JSON.parse(clientes)])
			dispatch({
				type: "INITIALIZING",
				payload: {
					...initialState,
					clientes: JSON.parse(clientes)
				}
			})
		} else {
			setClientes([
				{
					name: "Isaac Daniel Bezerra da Silva",
					email: "IsaacDaniel@gmail.com.com",
					is_active: true,
					telefone: "(88)99790-8018",
					CPFCNPJ: "066.144.055-68",
					CEP: "62250-000",
					logradouro: "Manoel Dias",
					numero: "956",
					complemento: "AP",
					bairro: "Reino",
					cidade: "Ipu",
					estado: "CE",
					id: 1,
				},
				{
					name: "Lucas Martins Mororó",
					email: "LucasMartinsMororó@gmail.com",
					is_active: true,
					telefone: "(11)11111-1111",
					CPFCNPJ: "066.144.055-68",
					CEP: "62250-000",
					logradouro: "Manoel Dias",
					numero: "956",
					complemento: "AP",
					bairro: "Reino",
					cidade: "Ipu",
					estado: "CE",
					id: 2,
				},
				{
					name: "Andesson Araujo",
					email: "AndresonAraujo@gmail.com",
					is_active: true,
					telefone: "(22)22222-2222",
					CPFCNPJ: "555.124.255-68",
					CEP: "62250000",
					logradouro: "Manoel Dias",
					numero: "956",
					complemento: "AP",
					bairro: "Reino",
					cidade: "Ipu",
					estado: "CE",
					id: 3,
				},
				{
					name: "Renan Carlos Mesquita",
					email: "RenanCarlos@gmail.com",
					is_active: true,
					telefone: "(33)33333-3333",
					CPFCNPJ: "555.188.255-88",
					CEP: "62250000",
					logradouro: "Manoel Dias",
					numero: "956",
					complemento: "AP",
					bairro: "Reino",
					cidade: "Ipu",
					estado: "CE",
					id: 4,
				},
			])
			dispatch({
				type: "INITIALIZING",
				payload: {
					...initialState,
					clientes: [
						{
							name: "Isaac Daniel Bezerra da Silva",
							email: "IsaacDaniel@gmail.com.com",
							is_active: true,
							telefone: "(88)99790-8018",
							CPFCNPJ: "066.144.055-68",
							CEP: "62250-000",
							logradouro: "Manoel Dias",
							numero: "956",
							complemento: "AP",
							bairro: "Reino",
							cidade: "Ipu",
							estado: "CE",
							id: 1,
						},
						{
							name: "Lucas Martins Mororó",
							email: "LucasMartinsMororó@gmail.com",
							is_active: true,
							telefone: "(11)11111-1111",
							CPFCNPJ: "066.144.055-68",
							CEP: "62250-000",
							logradouro: "Manoel Dias",
							numero: "956",
							complemento: "AP",
							bairro: "Reino",
							cidade: "Ipu",
							estado: "CE",
							id: 2,
						},
						{
							name: "Andesson Araujo",
							email: "AndresonAraujo@gmail.com",
							is_active: true,
							telefone: "(22)22222-2222",
							CPFCNPJ: "555.124.255-68",
							CEP: "62250000",
							logradouro: "Manoel Dias",
							numero: "956",
							complemento: "AP",
							bairro: "Reino",
							cidade: "Ipu",
							estado: "CE",
							id: 3,
						},
						{
							name: "Renan Carlos Mesquita",
							email: "RenanCarlos@gmail.com",
							is_active: true,
							telefone: "(33)33333-3333",
							CPFCNPJ: "555.188.255-88",
							CEP: "62250000",
							logradouro: "Manoel Dias",
							numero: "956",
							complemento: "AP",
							bairro: "Reino",
							cidade: "Ipu",
							estado: "CE",
							id: 4,
						},
					]
				}
			})
		}
	}, [])

	return (
		<ClientesContext.Provider
			value={{
				clientes,
				setClientes,
				stateReducer,
				deleteClient,
				updateClient,
				addClient,
				// verification,
				// setVerification,
			}}
		>
			{children}
		</ClientesContext.Provider>
	);
};
