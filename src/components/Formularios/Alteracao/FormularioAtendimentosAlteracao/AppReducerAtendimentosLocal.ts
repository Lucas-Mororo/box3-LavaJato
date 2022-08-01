export default function reducer(state: any, action: { type: any; payload: any; }) {
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
                atendimentos: state.atendimentos.filter((servico: { id: number; }) => servico.id !== action.payload),
            };
            
        case "DELETEAll":
        return {
            ...state,
            atendimentos: state.atendimentos.filter((servico: { id: number; }) => servico.id < action.payload),
        };
    }
}
