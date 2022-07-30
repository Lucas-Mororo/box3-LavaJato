import { Clientes } from "../../models/clientes";

export default function reducer(state: { clientes: Clientes[]; }, action: { type: any; payload: any; }) {
    switch (action.type) {
        case 'INITIALIZING':
            return action.payload;

        case "ADD":
            return {
                ...state,
                clientes: [...state.clientes, action.payload],
            };

        case "DELETE":
            return {
                ...state,
                clientes: state.clientes.filter((cliente: { id: number; }) => cliente.id !== action.payload),
            };

        case "UPDATE":
            const updatedCliente = action.payload;
            

            const updatedClientes = state.clientes.map((cliente: { id: number; }) => {
                if (cliente.id === updatedCliente.id) {
                    return updatedCliente;
                }
                return cliente;
            });
            return {
                ...state,
                clientes: updatedClientes,
            };
    }
}
