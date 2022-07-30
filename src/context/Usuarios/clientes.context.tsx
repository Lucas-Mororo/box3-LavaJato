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
	// const [verification, setVerification] = React.useState<boolean>(true);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialState = { clientes: [] };
	const [stateReducer, dispatch] = React.useReducer(appReducer, initialState);

	function deleteClient(id: number) {
		alert("asdasdasda");
		if (window.confirm("Deseja deletar este depoimento?")) {
			Notify("Evento deletado com sucesso!");
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

	// useEffect(() => {
	// 	getPublicationsProfile(state.id)
	// 		.then(({ data }) => {
	// 			setPublicacoes(data);
	// 			dispatch({
	// 				type: "INITIALIZING",
	// 				payload: {
	// 					...initialState,
	// 					publicacoes: data
	// 				}
	// 			})
	// 		})
	// 		.catch(() => {
	// 			setVerification(false);
	// 		});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [state.id])

	useEffect(() => {
		setClientes([
			{
				name: "Lucas",
				email: "Lucas@gmail.com",
				is_active: true,
				telefone: "88997908018",
				CPFCNPJ: "06614405568",
				CEP: "62250000",
				logradouro: "Manoel Dias",
				numero: "956",
				complemento: "AP",
				bairro: "Reino",
				cidade: "Ipu",
				estado: "CE",
				id: 0,
			},
			{
				name: "LucasMMMMMMMMMMMMMMMMM",
				email: "LucasMMMMMMMMMMMMMMMMM@gmail.com",
				is_active: true,
				telefone: "88997908018",
				CPFCNPJ: "06614405568",
				CEP: "62250000",
				logradouro: "Manoel Dias",
				numero: "956",
				complemento: "AP",
				bairro: "Reino",
				cidade: "Ipu",
				estado: "CE",
				id: 1,
			},
		])
		dispatch({
			type: "INITIALIZING",
			payload: {
				...initialState,
				clientes: [
					{
						name: "Lucas",
						email: "Lucas@gmail.com",
						is_active: true,
						telefone: "88997908018",
						CPFCNPJ: "06614405568",
						CEP: "62250000",
						logradouro: "Manoel Dias",
						numero: "956",
						complemento: "AP",
						bairro: "Reino",
						cidade: "Ipu",
						estado: "CE",
						id: 0,
					},
					{
						name: "LucasMMMMMMMMMMMMMMMMM",
						email: "LucasMMMMMMMMMMMMMMMMM@gmail.com",
						is_active: true,
						telefone: "88997908018",
						CPFCNPJ: "06614405568",
						CEP: "62250000",
						logradouro: "Manoel Dias",
						numero: "956",
						complemento: "AP",
						bairro: "Reino",
						cidade: "Ipu",
						estado: "CE",
						id: 1,
					},
				]
			}
		})
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
