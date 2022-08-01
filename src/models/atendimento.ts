export interface Atendimentos {
  dataI: Date | string | any;
  dataF?: Date | string | any;
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
  idCliente: number;
}

export interface AtendimentosReducer {
  atendimentos: Atendimentos[];
}
