import { ClientesContextType } from "./models/PropsClientesContext";

/**
 * Define o estado inicial que vai conter os dados da requisição. Como também estados que são ultilizados para o Backdrop e para a verificação se a requisição foi completa com sucesso
 */
export const INI_VALUES: ClientesContextType = {
    clientes: [
        {
            name: "",
            email: "",
            is_active: true,
            telefone: "",
            CPFCNPJ: "",
            CEP: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            id: 0,
        },
    ],
    setClientes: () => { },
    // verification: true,
    // setVerification: () => { },
    stateReducer: {
        clientes: [
            {
                name: "",
                email: "",
                is_active: true,
                telefone: "",
                CPFCNPJ: "",
                CEP: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                estado: "",
                id: 0,
            },
        ]
    },
    deleteClient: () => { },
    updateClient: () => { },
    addClient: () => { },
};
