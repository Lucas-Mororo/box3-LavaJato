import { Atendimentos } from "../../models/atendimento";

export default function reducer(state: { atendimentos: Atendimentos[]; }, action: { type: any; payload: any; }) {
    switch (action.type) {
        case 'INITIALIZING':
            return action.payload;

        case "ADD":
            return {
                ...state,
                atendimentos: [...state.atendimentos, action.payload],
            };

        case "DELETE":
            return {
                ...state,
                atendimentos: state.atendimentos.filter((atendimento: { id: number; }) => atendimento.id !== action.payload),
            };

        case "UPDATE":
            const updatedAtendimento = action.payload;
            

            const updatedAtendimentos = state.atendimentos.map((atendimento: { id: number; }) => {
                if (atendimento.id === updatedAtendimento.id) {
                    return updatedAtendimento;
                }
                return atendimento;
            });
            return {
                ...state,
                atendimentos: updatedAtendimentos,
            };
    }
}
