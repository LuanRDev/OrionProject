export type ParticipanteStatus = 'confirmado' | 'pendente' | 'falta';

export interface Participante {
  id: number;
  nome: string;
  cpf: string;
  dataParticipacao: string;
  codigoEvento: number;
}
