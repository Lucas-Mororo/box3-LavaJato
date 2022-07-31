import { ServicosAtendimentos } from "../../models/servicos";

export default function reducer(state: { servicosAtendimentos: ServicosAtendimentos[]; }, action: { type: any; payload: any; }) {
    switch (action.type) {
        case 'INITIALIZING':
            return action.payload;

        case "ADD":
            return {
                ...state,
                servicosAtendimentos: [...state.servicosAtendimentos, action.payload],
            };

        case "DELETE":
            return {
                ...state,
                servicosAtendimentos: state.servicosAtendimentos.filter((servico: { id: number; }) => servico.id !== action.payload),
            };
        case "DELETEAll":
        return {
            ...state,
            servicosAtendimentos: state.servicosAtendimentos.filter((servico: { id: number; }) => servico.id < action.payload),
        };
    }
}
