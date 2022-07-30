import React from "react";
import { Marcas, MarcasReducer } from "../../../models/marcas";

export type MarcasContextType = {
	marcas: Marcas[];
	setMarcas: React.Dispatch<React.SetStateAction<Marcas[]>>;
	// verification: boolean;
	// setVerification: React.Dispatch<React.SetStateAction<boolean>>;
	stateReducer: MarcasReducer;
	deleteMarca: (id: number) => void;
	updateMarca: (updatedMarca: any) => void;
	addMarca: (addMarca: any) => void;
};
