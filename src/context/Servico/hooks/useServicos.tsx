import { useContext } from "react";
import { ServicosContext } from "../servicos.context";

export const useServicosContext = () => {
	return useContext(ServicosContext);
};
