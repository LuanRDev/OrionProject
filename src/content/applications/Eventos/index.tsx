import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '../../../components/Footer';
import EventosApplication from './EventosApplication';

interface ITipoEvento {
  codigoTipo: number;
  tipo: string;
}

function ApplicationsEventos() {
  const tiposEventos: ITipoEvento[] = [
    {
      codigoTipo: 1,
      tipo: 'Curso'
    },
    {
      codigoTipo: 2,
      tipo: 'Palestra'
    },
    {
      codigoTipo: 3,
      tipo: 'Treinamento'
    }
  ];
  return (
    <>
      <Helmet>
        <title>Eventos - Projeto Orion</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader TiposEventos={tiposEventos} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <EventosApplication />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsEventos;
