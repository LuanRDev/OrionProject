import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from '../../../components/Footer';

import Eventos from './Eventos';
import GraficosLista from './GraficosLista';
import { apiEventos } from '../../../core/services/api/axios';
import { useEffect, useState } from 'react';
import { Evento } from '../../../models/evento';
import { TipoEvento } from '../../../models/tipo_evento';
import SuspenseLoader from '../../../components/SuspenseLoader';

interface Tempo {
  ultimaSemana: number[];
  ultimoMes: number[];
  ultimoTrimestre: number[];
}

function DashboardCrypto() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [dadosGrafico, setDadosGrafico] = useState<Tempo>();
  const [tiposEventos, setTiposEventos] = useState<TipoEvento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        await apiEventos
          .get('/api/eventos?limit=3')
          .then((result) => setEventos(result.data));
      } catch (error) {
        console.log(error);
      }
      try {
        await apiEventos
          .get('/api/eventos/tipos')
          .then((result) => setTiposEventos(result.data));
      } catch (error) {
        console.log(error);
      }
      try {
        await apiEventos
          .get('/api/eventos/reports')
          .then((result) => setDadosGrafico(result.data));
      } catch (error) {
        console.log(error);
      }
    }
    if (
      eventos.length === 0 ||
      tiposEventos.length === 0 ||
      dadosGrafico === undefined
    ) {
      getData();
    }
    setIsLoading(false);
  }, []);
  if (isLoading === true) {
    return <SuspenseLoader />;
  }
  return eventos.length !== 0 &&
    tiposEventos.length !== 0 &&
    dadosGrafico !== undefined ? (
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
          <Grid item lg={12} xs={12}>
            <Eventos Eventos={eventos} TiposEventos={tiposEventos} />
          </Grid>
          <Grid item xs={12}>
            <GraficosLista DadosGrafico={dadosGrafico} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  ) : (
    <SuspenseLoader />
  );
}

export default DashboardCrypto;
