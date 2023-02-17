import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from '../../../components/Footer';

import AccountSecurity from './AccountSecurity';
import Eventos from './Eventos';
import GraficosLista from './GraficosLista';
import { apiEventos } from '../../../core/services/api/axios';
import { useEffect, useState } from 'react';
import { Evento } from '../../../models/evento';
import { TipoEvento } from '../../../models/tipo_evento';

function DashboardCrypto() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [tiposEventos, setTiposEventos] = useState<TipoEvento[]>([]);

  useEffect(() => {
    async function getEventos() {
      try {
        await apiEventos
          .get('/api/eventos?limit=3')
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
  });
  return (
    <>
      <Helmet>
        <title>Dashboard - Projeto Orion</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item lg={8} xs={12}>
            <Eventos Eventos={eventos} TiposEventos={tiposEventos} />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <GraficosLista />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
