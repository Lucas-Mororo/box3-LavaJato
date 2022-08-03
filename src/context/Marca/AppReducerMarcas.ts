import { Marcas } from "../../models/marcas";

export default function reducer(state: { marcas: Marcas[]; }, action: { type: any; payload: any; }) {
    switch (action.type) {
        case 'INITIALIZING':
            return action.payload;

        case "ADD":
            return {
                ...state,
                marcas: [...state.marcas, action.payload],
            };

        case "DELETE":
            return {
                ...state,
                marcas: state.marcas.filter((marca: { id: number; }) => marca.id !== action.payload),
            };

        case "UPDATE":
            const updatedMarca = action.payload;


            const updatedMarcas = state.marcas.map((marca: { id: number; }) => {
                if (marca.id === updatedMarca.id) {
                    return updatedMarca;
                }
                return marca;
            });
            return {
                ...state,
                marcas: updatedMarcas,
            };
    }
}
