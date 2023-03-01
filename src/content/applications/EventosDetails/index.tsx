import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '../../../components/Footer';
import SuspenseLoader from '../../../components/SuspenseLoader';
import EventoInformation from './EventoInformation';
import { TipoEvento } from '../../../models/tipo_evento';
import { Evento } from '../../../models/evento';
import { useEffect, useState } from 'react';
import { apiEventos } from '../../../core/services/api/axios';
import { useParams, useNavigate } from 'react-router-dom';

function EventosDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [evento, setEvento] = useState<Evento>();
  const [tiposEventos, setTiposEventos] = useState<TipoEvento[]>([]);
  useEffect(() => {
    async function getData() {
      try {
        await apiEventos.get(`/api/eventos/${id}`).then((result) => {
          setEvento(result.data);
          setIsLoading(false);
        });
      } catch (error) {
        // navigate('/404');
        console.log(error);
      }

      try {
        await apiEventos.get('/api/eventos/tipos').then((result) => {
          setTiposEventos(result.data);
          setIsLoading(false);
        });
      } catch (error) {
        // navigate('/404');
        console.log(error);
      }
    }
    getData();
  }, []);

  return evento !== undefined &&
    evento.id !== undefined &&
    tiposEventos !== undefined ? (
    <>
      <Helmet>
        <title>Detalhes do evento - Projeto Orion</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader Evento={evento} TiposEventos={tiposEventos} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <EventoInformation Evento={evento} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  ) : (
    <>
      <Helmet>
        <title>Detalhes do evento - Projeto Orion</title>
      </Helmet>
      <SuspenseLoader />
    </>
  );
}

export default EventosDetails;
