import { MarcasContextType } from "./models/PropsMarcasContext";

/**
 * Define o estado inicial que vai conter os dados da requisição. Como também estados que são ultilizados para o Backdrop e para a verificação se a requisição foi completa com sucesso
 */
export const INI_VALUES: MarcasContextType = {
    marcas: [
        {
            name: "",
            id: 0,
        },
    ],
    setMarcas: () => { },
    stateReducerMarca: {
        marcas: [
            {
                name: "",
                id: 0,
            },
        ]
    },
    deleteMarca: () => { },
    updateMarca: () => { },
    addMarca: () => { },
};
