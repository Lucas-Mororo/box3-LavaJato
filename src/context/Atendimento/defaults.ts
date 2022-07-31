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
                    servico: "Cristalização de vidros",
                    descricao: "Cristaliza os vidros do seu veículo para deixalos brilhantes",
                    valor: "50,00",
                    id: 0,
                },
            ],
            id: 0,
            state: true,
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
                        servico: "Cristalização de vidros",
                        descricao: "Cristaliza os vidros do seu veículo para deixalos brilhantes",
                        valor: "50,00",
                        id: 0,
                    },
                ],
                id: 0,
                state: true,
            },
        ]
    },
    deleteAtendimento: () => { },
    updateAtendimento: () => { },
    addAtendimento: () => { },
};
