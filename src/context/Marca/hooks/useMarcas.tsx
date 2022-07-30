import { useContext } from "react";
import { MarcasContext } from "../marcas.context";

export const useMarcasContext = () => {
	return useContext(MarcasContext);
};
