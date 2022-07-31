import { Servicos } from "../models/servicos";

export interface Atendimentos {
  dataI: string,
  dataF: string,
  cliente: string,
  telefone: string,
  marca: string,
  modelo: string,
  placa: string,
  CEP: string,
  logradouro: string,
  numero: string,
  complemento: string,
  bairro: string,
  cidade: string,
  estado: string,
  servicos: Servicos[],
  id: number,
  state: boolean,
}

export interface AtendimentosReducer {
  atendimentos: Atendimentos[];
}
