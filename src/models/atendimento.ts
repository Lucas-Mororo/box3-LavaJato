export interface Atendimentos {
  dataI: string;
  dataF: string;
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
  servicos: [
    {
      servico: string;
      valor: string;
      id: number;
    }
  ];
  id: number;
  state: boolean;
}

export interface AtendimentosReducer {
  atendimentos: Atendimentos[];
}
