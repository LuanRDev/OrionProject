import { Typography, Button, Grid } from '@mui/material';
import DeleteEventoForm from 'src/components/Forms/DeleteEventoForm';
import EditEventoForm from 'src/components/Forms/EditEventoForm';

interface IEvento {
  id: number;
  tipoEvento: number;
  descricao: string;
  empresa: string;
  instrutor: string;
  dataRealizado: string;
  cargaHoraria: number;
  participantesEsperados: number;
  participantesConfirmados: number;
  inativo: boolean;
  conteudoEvento: IConteudoEvento[];
}

interface IConteudoEvento {
  nome: string;
  url: string;
}
interface ITipoEvento {
  codigoTipo: number;
  tipo: string;
}
interface PropsEditarEvento {
  Evento: IEvento | undefined;
  TiposEventos: ITipoEvento[] | undefined;
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
      </Grid>
      <Grid item>
        <DeleteEventoForm id={Evento.id} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
