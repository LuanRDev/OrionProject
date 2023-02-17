export type ParticipanteStatus = 'confirmado' | 'pendente' | 'falta';

export interface Participante {
  id: number;
  status: ParticipanteStatus;
  nome: string;
  cpf: string;
  dataParticipacao: string;
  codigoEvento: number;
}
