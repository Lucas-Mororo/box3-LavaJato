import React from "react";
import { Modelos, ModelosReducer } from "../../../models/modelos";

export type ModelosContextType = {
	modelos: Modelos[];
	setModelos: React.Dispatch<React.SetStateAction<Modelos[]>>;
	// verification: boolean;
	// setVerification: React.Dispatch<React.SetStateAction<boolean>>;
	stateReducer: ModelosReducer;
	deleteModelo: (id: number) => void;
	updateModelo: (updatedModelo: any) => void;
	addModelo: (addModelo: any) => void;
};
