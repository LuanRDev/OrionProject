import {
  Card,
  CardContent,
  CardActions,
  Stack,
  Typography,
  Grid,
  Container
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import RecentActivity from '../Users/profile/RecentActivity';
import EventoInformation from './EventoInformation';

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

function EventosDetailsApplication() {
  const evento: IEvento = {
    id: 1,
    tipoEvento: 1,
    descricao:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    cargaHoraria: 19,
    dataRealizado: '2022-08-04T07:11:23Z',
    empresa: 'Skimia',
    instrutor: 'Irène',
    participantesConfirmados: 2,
    participantesEsperados: 10,
    inativo: false,
    conteudoEvento: [
      {
        nome: 'teste.txt',
        url: 'eventos/empresas/empresa teste/121/documentos/8a409c26-647b-47b6-9c54-5e292de3f77a'
      },
      {
        nome: 'arquivopdf.pdf',
        url: 'eventos/empresas/empresa teste/121/documentos/a009b719-ca8a-40a5-af78-970a65e25144'
      }
    ]
  };
  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <EventoInformation Evento={evento} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default EventosDetailsApplication;
