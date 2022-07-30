import { useContext } from "react";
import { ClientesContext } from "../clientes.context";

export const useClientesContext = () => {
	return useContext(ClientesContext);
};
