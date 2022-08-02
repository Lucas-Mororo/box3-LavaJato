/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { MarcasContextType } from "./models/PropsMarcasContext";
import { Marcas } from "../../models/marcas";
import { INI_VALUES } from "./defaults";
import appReducer from "./AppReducerMarcas";
import Notify from "../../utils/Notification";

type ChildrenProps = {
	children: React.ReactNode;
};

export const MarcasContext = React.createContext<MarcasContextType>(INI_VALUES);

export const MarcasProvider = ({ children }: ChildrenProps) => {
	const [marcas, setMarcas] = React.useState<Marcas[]>([]);
	// const [verification, setVerification] = React.useState<boolean>(true);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialState = { marcas: [] };
	const [stateReducerMarca, dispatch] = React.useReducer(appReducer, initialState);

	function deleteMarca(id: number) {
		if (window.confirm("Deseja deletar esta marca?")) {
			Notify("Marca deletada com sucesso!");
			dispatch({
				type: "DELETE",
				payload: id,
			});
		}
	}

	function updateMarca(updatedMarc: any) {
		dispatch({
			type: "UPDATE",
			payload: updatedMarc,
		});
	}

	function addMarca(addMarc: any) {
		dispatch({
			type: "ADD",
			payload: addMarc,
		});
	}


	useEffect(() => {
		const marcas = localStorage.getItem("@marcas");

		if (marcas) {
			setMarcas([JSON.parse(marcas)])
			dispatch({
				type: "INITIALIZING",
				payload: {
					...initialState,
					marcas: JSON.parse(marcas)
				}
			})
		} else {
			setMarcas([
				{
					name: "Chevrolet",
					id: 1,
				},
				{
					name: "Fiat",
					id: 2,
				},
				{
					name: "Ford",
					id: 3,
				},
				{
					name: "Honda",
					id: 4,
				},
				{
					name: "Hyundai",
					id: 5,
				},
				{
					name: "Toyota",
					id: 6,
				},
				{
					name: "Volkswagen",
					id: 7,
				},
			])
			dispatch({
				type: "INITIALIZING",
				payload: {
					...initialState,
					marcas: [
						{
							name: "Chevrolet",
							id: 1,
						},
						{
							name: "Fiat",
							id: 2,
						},
						{
							name: "Ford",
							id: 3,
						},
						{
							name: "Honda",
							id: 4,
						},
						{
							name: "Hyundai",
							id: 5,
						},
						{
							name: "Toyota",
							id: 6,
						},
						{
							name: "Volkswagen",
							id: 7,
						},
					]
				}
			})
		}
	}, [])

	return (
		<MarcasContext.Provider
			value={{
				marcas,
				setMarcas,
				stateReducerMarca,
				deleteMarca,
				updateMarca,
				addMarca,
				// verification,
				// setVerification,
			}}
		>
			{children}
		</MarcasContext.Provider>
	);
};
