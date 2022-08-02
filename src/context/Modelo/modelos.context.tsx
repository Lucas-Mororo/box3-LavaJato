/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ModelosContextType } from "./models/PropsModelosContext";
import { Modelos } from "../../models/modelos";
import { INI_VALUES } from "./defaults";
// import { deletePublication, getPublicationsProfile } from "services/Publicacoes";
// import { usePortfolio } from "context/Portfolio";
// import Notify from "../../utils/Notification";
import appReducer from "./AppReducerModelos";
import Notify from "../../utils/Notification";

type ChildrenProps = {
	children: React.ReactNode;
};

export const ModelosContext = React.createContext<ModelosContextType>(INI_VALUES);

export const ModelossProvider = ({ children }: ChildrenProps) => {
	const [modelos, setModelos] = React.useState<Modelos[]>([]);
	const initialState = { modelos: [] };
	const [stateReducerModelo, dispatch] = React.useReducer(appReducer, initialState);

	function deleteModelo(id: number) {
		if (window.confirm("Deseja deletar esta modelo?")) {
			Notify("Evento deletado com sucesso!");
			dispatch({
				type: "DELETE",
				payload: id,
			});
		}
	}

	function updateModelo(updatedModel: Modelos) {
		dispatch({
			type: "UPDATE",
			payload: updatedModel,
		});
	}

	function addModelo(addModel: any) {
		dispatch({
			type: "ADD",
			payload: addModel,
		});
	}


	useEffect(() => {
		const modelos = localStorage.getItem("@modelos");

		if (modelos) {
			setModelos([JSON.parse(modelos)])
			dispatch({
				type: "INITIALIZING",
				payload: {
					...initialState,
					modelos: JSON.parse(modelos)
				}
			})
		} else {
			setModelos([
				{
					modelo: "Camaro",
					marca: "Chevrolet",
					id: 1,
				},
				{
					modelo: "Cronos",
					marca: "Fiat",
					id: 2,
				},
				{
					modelo: "Onix",
					marca: "Chevrolet",
					id: 3,
				},
				{
					modelo: "Tracker",
					marca: "Chevrolet",
					id: 4,
				},
				{
					modelo: "Uno",
					marca: "Fiat",
					id: 5,
				},
			])
			dispatch({
				type: "INITIALIZING",
				payload: {
					...initialState,
					modelos: [
						{
							modelo: "Camaro",
							marca: "Chevrolet",
							id: 1,
						},
						{
							modelo: "Cronos",
							marca: "Fiat",
							id: 2,
						},
						{
							modelo: "Onix",
							marca: "Chevrolet",
							id: 3,
						},
						{
							modelo: "Tracker",
							marca: "Chevrolet",
							id: 4,
						},
						{
							modelo: "Uno",
							marca: "Fiat",
							id: 5,
						},
					]
				}
			})
		}
	}, [])

	return (
		<ModelosContext.Provider
			value={{
				modelos,
				setModelos,
				stateReducerModelo,
				deleteModelo,
				updateModelo,
				addModelo,
				// verification,
				// setVerification,
			}}
		>
			{children}
		</ModelosContext.Provider>
	);
};
