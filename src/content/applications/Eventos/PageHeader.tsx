import { Typography, Button, Grid } from '@mui/material';
import { TipoEvento } from '../../../models/tipo_evento';
import NewEventoForm from '../../../components/Forms/NewEventoForm';

interface PropsNovoEvento {
  TiposEventos: TipoEvento[] | undefined;
}

function PageHeader({ TiposEventos }: PropsNovoEvento) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Eventos
        </Typography>
      </Grid>
      <Grid item>
        <NewEventoForm TiposEventos={TiposEventos} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
