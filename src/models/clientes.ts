export interface Clientes {
    name: string,
    email: string,
    is_active: boolean,
    telefone: string,
    CPFCNPJ: string,
    CEP: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    id: number,
};

export interface ClientesReducer {
    clientes: Clientes[]
};
