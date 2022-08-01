import { AtendimentoContextType } from "./models/PropsAtendimentosContext";

/**
 * Define o estado inicial que vai conter os dados da requisição. Como também estados que são ultilizados para o Backdrop e para a verificação se a requisição foi completa com sucesso
 */
export const INI_VALUES: AtendimentoContextType = {
    atendimentos: [
        {
            dataI: "",
            dataF: "",
            cliente: "",
            telefone: "",
            marca: "",
            modelo: "",
            placa: "",
            CEP: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            servicos: [
                {
                    servico: "",
                    valor: "",
                    id: 0,
                },
            ],
            valor: 0,
            id: 0,
            state: true,
            idCliente: 0,
        },
    ],
    setAtendimentos: () => { },
    stateReducerAtendimentos: {
        atendimentos: [
            {
                dataI: "",
                dataF: "",
                cliente: "",
                telefone: "",
                marca: "",
                modelo: "",
                placa: "",
                CEP: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                estado: "",
                servicos: [
                    {
                        servico: "",
                        valor: "",
                        id: 0,
                    },
                ],
                valor: 0,
                id: 1,
                state: true,
                idCliente: 0,
            },
        ]
    },
    deleteAtendimento: () => { },
    updateAtendimento: () => { },
    addAtendimento: () => { },
};
