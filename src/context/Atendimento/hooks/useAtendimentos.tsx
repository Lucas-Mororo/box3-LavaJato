import { useContext } from "react";
import { AtendimentosContext } from "../atendimento.context";

export const useAtendimentoContext = () => {
	return useContext(AtendimentosContext);
};
