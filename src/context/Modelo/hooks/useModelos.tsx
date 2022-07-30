import { useContext } from "react";
import { ModelosContext } from "../modelos.context";

export const useModelosContext = () => {
	return useContext(ModelosContext);
};
