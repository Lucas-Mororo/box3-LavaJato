import React from "react";
import { Clientes, ClientesReducer } from "../../../models/clientes";

export type ClientesContextType = {
	clientes: Clientes[];
	setClientes: React.Dispatch<React.SetStateAction<Clientes[]>>;
	// verification: boolean;
	// setVerification: React.Dispatch<React.SetStateAction<boolean>>;
	stateReducer: ClientesReducer;
	deleteClient: (id: number) => void;
	updateClient: (updatedUser: any) => void;
	addClient: (addUser: any) => void;
};
