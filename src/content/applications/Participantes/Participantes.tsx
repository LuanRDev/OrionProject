import { Card } from '@mui/material';
import TabelaParticipantes from './TabelaParticipantes';
import { Participante } from '../../../models/participante';
import DataGridParticipantes from './DataGridParticipantes';

interface ParticipantesTableProps {
  Participantes: Participante[];
}

function Participantes({ Participantes }: ParticipantesTableProps) {
  return (
    <Card>
      <DataGridParticipantes participantes={Participantes} />
    </Card>
  );
}

export default Participantes;
