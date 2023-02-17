import { Card } from '@mui/material';
import TabelaParticipantes from './TabelaParticipantes';
import { Participante } from '../../../models/participante';

interface ParticipantesTableProps {
  Participantes: Participante[];
}

function Participantes({ Participantes }: ParticipantesTableProps) {
  return (
    <Card>
      <TabelaParticipantes participantes={Participantes} />
    </Card>
  );
}

export default Participantes;
