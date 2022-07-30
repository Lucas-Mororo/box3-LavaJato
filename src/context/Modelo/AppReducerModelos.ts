import { Modelos } from "../../models/modelos";

export default function reducer(state: { modelos: Modelos[]; }, action: { type: any; payload: any; }) {
    switch (action.type) {
        case 'INITIALIZING':
            return action.payload;

        case "ADD":
            return {
                ...state,
                modelos: [...state.modelos, action.payload],
            };

        case "DELETE":
            return {
                ...state,
                modelos: state.modelos.filter((modelo: { id: number; }) => modelo.id !== action.payload),
            };

        case "UPDATE":
            const updatedModelo = action.payload;
            

            const updatedModelos = state.modelos.map((modelo: { id: number; }) => {
                if (modelo.id === updatedModelo.id) {
                    return updatedModelo;
                }
                return modelo;
            });
            return {
                ...state,
                modelos: updatedModelos,
            };
    }
}
