import { useContext } from "react";
import { ServicosAtendimentosContext } from "../servicosAtendimentos.context";

export const useServicosAtendimentosContext = () => {
	return useContext(ServicosAtendimentosContext);
};
