import { Typography, Button, Grid } from '@mui/material';
import { Evento } from '../../../models/evento';
import { TipoEvento } from '../../../models/tipo_evento';
import DeleteEventoForm from '../../../components/Forms/DeleteEventoForm';
import EditEventoForm from '../../../components/Forms/EditEventoForm';
interface PropsEditarEvento {
  Evento: Evento;
  TiposEventos: TipoEvento[];
}
function PageHeader({ Evento, TiposEventos }: PropsEditarEvento) {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Eventos
        </Typography>
      </Grid>
      <Grid item>
        <EditEventoForm Evento={Evento} TiposEventos={TiposEventos} />
        <DeleteEventoForm id={Evento.id} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
