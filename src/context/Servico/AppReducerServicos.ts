import { Servicos } from "../../models/servicos";

export default function reducer(state: { servicos: Servicos[]; }, action: { type: any; payload: any; }) {
    switch (action.type) {
        case 'INITIALIZING':
            return action.payload;

        case "ADD":
            return {
                ...state,
                servicos: [...state.servicos, action.payload],
            };

        case "DELETE":
            return {
                ...state,
                servicos: state.servicos.filter((servico: { id: number; }) => servico.id !== action.payload),
            };

        case "UPDATE":
            const updatedServico = action.payload;
            

            const updatedServicos = state.servicos.map((servico: { id: number; }) => {
                if (servico.id === updatedServico.id) {
                    return updatedServico;
                }
                return servico;
            });
            return {
                ...state,
                usuarios: updatedServicos,
            };
    }
}
