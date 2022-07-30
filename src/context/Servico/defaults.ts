import { ServicosContextType } from "./models/PropsServicosContext";

/**
 * Define o estado inicial que vai conter os dados da requisição. Como também estados que são ultilizados para o Backdrop e para a verificação se a requisição foi completa com sucesso
 */
export const INI_VALUES: ServicosContextType = {
    servicos: [
        {
            servico: "",
            descricao: "",
            valor: "",
            id: 0,
        },
    ],
    setServicos: () => { },
    stateReducer: {
        servicos: [
            {
                servico: "",
                descricao: "",
                valor: "",
                id: 0,
            },
        ]
    },
    deleteServico: () => { },
    updateServico: () => { },
    addServico: () => { },
};
