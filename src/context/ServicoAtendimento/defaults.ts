import { ServicosAtendimentosContextType } from "./models/PropsServicosContext";

/**
 * Define o estado inicial que vai conter os dados da requisição. Como também estados que são ultilizados para o Backdrop e para a verificação se a requisição foi completa com sucesso
 */
export const INI_VALUES: ServicosAtendimentosContextType = {
    servicosAtendimentos: [
        {
            servico: "",
            valor: 0,
            id: 0,
        },
    ],
    setServicosAtendimentos: () => { },
    stateReducerServicoAtendimentos: {
        servicosAtendimentos: [
            {
                servico: "",
                valor: 0,
                id: 0,
            },
        ]
    },
    deleteServicoAtendimento: () => { },
    deleteAllServicoAtendimento: () => { },
    addServicoAtendimento: () => { },
};
