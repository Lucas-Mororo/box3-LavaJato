import { ModelosContextType } from "./models/PropsModelosContext";

/**
 * Define o estado inicial que vai conter os dados da requisição. Como também estados que são ultilizados para o Backdrop e para a verificação se a requisição foi completa com sucesso
 */
export const INI_VALUES: ModelosContextType = {
    modelos: [
        {
            modelo: "",
            marca: "",
            id: 0,
        },
    ],
    setModelos: () => { },
    stateReducerModelo: {
        modelos: [
            {
                modelo: "",
                marca: "",
                id: 0,
            },
        ]
    },
    deleteModelo: () => { },
    updateModelo: () => { },
    addModelo: () => { },
};
