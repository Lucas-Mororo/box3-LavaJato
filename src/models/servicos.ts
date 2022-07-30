export interface Servicos {
  serviço: string;
  descrição: string;
  valor: string,
  id: number;
}

export interface ServicosReducer {
  servicos: Servicos[];
}
