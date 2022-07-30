export interface Servicos {
  servico: string;
  descricao: string;
  valor: string,
  id: number;
}

export interface ServicosReducer {
  servicos: Servicos[];
}
