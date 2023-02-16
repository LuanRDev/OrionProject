import { Typography, Button, Grid } from '@mui/material';
import NewEventoForm from 'src/components/Forms/NewEventoForm';

function PageHeader() {
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
        <NewEventoForm />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
