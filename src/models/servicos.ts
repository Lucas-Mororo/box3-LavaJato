export interface Servicos {
  servico: string;
  descricao: string;
  valor: number;
  id: number;
}

export interface ServicosReducer {
  servicos: Servicos[];
}

export interface ServicosAtendimentos {
  servico: string;
  valor: number;
  id: number;
}

export interface ServicosAtendimentosReducer {
  servicosAtendimentos: ServicosAtendimentos[];
}
