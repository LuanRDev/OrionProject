import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '../../../components/Footer';
import SuspenseLoader from '../../../components/SuspenseLoader';
import EventosApplication from './EventosApplication';
import { TipoEvento } from '../../../models/tipo_evento';
import { Evento } from '../../../models/evento';
import { useEffect, useState } from 'react';
import { apiEventos } from '../../../core/services/api/axios';

function ApplicationsEventos() {
  const [isLoading, setIsLoading] = useState(true);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [tiposEventos, setTiposEventos] = useState<TipoEvento[]>([]);
  useEffect(() => {
    async function getEventos() {
      try {
        await apiEventos
          .get('/api/eventos')
          .then((result) => setEventos(result.data));
      } catch (error) {
        console.log(error);
      }
    }

    if (eventos.length === 0) {
      getEventos();
    }

    async function getTiposEventos() {
      try {
        await apiEventos
          .get('/api/eventos/tipos')
          .then((result) => setTiposEventos(result.data));
      } catch (error) {
        console.log(error);
      }
    }

    if (tiposEventos.length === 0) {
      getTiposEventos();
    }
    setIsLoading(false);
  });
  if (isLoading === true) {
    return <SuspenseLoader />;
  }
  return eventos.length !== 0 ? (
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
            <EventosApplication Eventos={eventos} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  ) : (
    <>
      <Helmet>
        <title>Eventos - Projeto Orion</title>
      </Helmet>
      <SuspenseLoader />
    </>
  );
}

export default ApplicationsEventos;
