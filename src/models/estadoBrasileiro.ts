export interface Regiao {
    id: number;
    nome: string;
    sigla: string;
}

export interface EstadoBrasileiro {
    id: number;
    nome: string;
    sigla: string;
    regiao: Regiao;
}
