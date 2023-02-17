import { Typography, Button, Grid } from '@mui/material';
import NewEventoForm from 'src/components/Forms/NewEventoForm';

interface PropsNovoEvento {
  TiposEventos: ITipoEvento[] | undefined;
}

interface ITipoEvento {
  codigoTipo: number;
  tipo: string;
}

function PageHeader({ TiposEventos }: PropsNovoEvento) {
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
        <NewEventoForm TiposEventos={TiposEventos} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
