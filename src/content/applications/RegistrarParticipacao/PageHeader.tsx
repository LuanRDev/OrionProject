import { Typography } from '@mui/material';
import { Evento } from '../../../models/evento';
import { ReturnEventoTipo } from '../../../components/ReturnEventoTipo';
import { FormatDate } from '../../../components/FormatDate';

interface PropsEvento {
  Evento: Evento;
}

function PageHeader({ Evento }: PropsEvento) {
  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        Registrar sua participação
      </Typography>
      <Typography variant="subtitle2">
        Registre sua participação para o {ReturnEventoTipo(Evento.tipoEvento)},
        pela empresa
        {Evento.empresa}.
      </Typography>
      <Typography variant="subtitle2">
        Descrição do evento: {Evento.descricao}
      </Typography>
      <Typography variant="subtitle2">
        Data da realização: {FormatDate(Evento.dataRealizado)}
      </Typography>
    </>
  );
}

export default PageHeader;
