import { ConteudoEvento } from './conteudo_evento';

export interface Evento {
  id: number;
  tipoEvento: number;
  descricao: string;
  empresa: string;
  instrutor: string;
  dataRealizado: string;
  cargaHoraria: number;
  participantesEsperados: number;
  participacoesConfirmadas: number;
  inativo: boolean;
  conteudoEventos: ConteudoEvento[];
}
