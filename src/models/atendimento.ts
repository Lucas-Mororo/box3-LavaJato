export interface Atendimentos {
  dataI: Date | string;
  dataF?: string;
  cliente: string;
  telefone: string;
  marca: string;
  modelo: string;
  placa: string;
  CEP: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  servicos?: Array<any>;
  valor: number;
  id: number;
  state: boolean;
}

export interface AtendimentosReducer {
  atendimentos: Atendimentos[];
}
