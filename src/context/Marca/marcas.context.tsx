/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { MarcasContextType } from "./models/PropsMarcasContext";
import { Marcas } from "../../models/marcas";
import { INI_VALUES } from "./defaults";
// import { deletePublication, getPublicationsProfile } from "services/Publicacoes";
// import { usePortfolio } from "context/Portfolio";
// import Notify from "../../utils/Notification";
import appReducer from "./AppReducerMarcas";
import Notify from "../../utils/Notification";

type ChildrenProps = {
	children: React.ReactNode;
};

export const MarcasContext = React.createContext<MarcasContextType>(INI_VALUES);

export const MarcassProvider = ({ children }: ChildrenProps) => {
	const [marcas, setMarcas] = React.useState<Marcas[]>([]);
	// const [verification, setVerification] = React.useState<boolean>(true);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialState = { marcas: [] };
	const [stateReducer, dispatch] = React.useReducer(appReducer, initialState);

	function deleteMarca(id: number) {
		if (window.confirm("Deseja deletar esta marca?")) {
			Notify("Evento deletado com sucesso!");
			dispatch({
				type: "DELETE",
				payload: id,
			});
		}
	}

	function updateMarca(updatedMarc: Marcas) {
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
	}, [])

	return (
		<MarcasContext.Provider
			value={{
				marcas,
				setMarcas,
				stateReducer,
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
