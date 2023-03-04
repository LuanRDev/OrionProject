import { useState, ChangeEvent, useEffect } from 'react';
import { Container, Grid, Tabs, Tab } from '@mui/material';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import RegistrarParticipacao from './RegistrarParticipacao';
import { useParams, useNavigate } from 'react-router-dom';
import { Evento } from '../../../models/evento';
import { apiEventos } from '../../../core/services/api/axios';
import SuspenseLoader from '../../../components/SuspenseLoader';
import request from 'axios';

function ApplicationRegistrarParticipacao() {
  const [isLoading, setIsLoading] = useState(false);
  const [evento, setEvento] = useState<Evento>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        await apiEventos.get(`/api/eventos/${id}`).then((result) => {
          setEvento(result.data);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        if (request.isAxiosError(error) && error.response) {
          if (error.response.status == 404) {
            navigate('/status/404');
          }
        }
      }
    }
    getData();
  }, []);
  return evento !== undefined && evento.id !== undefined ? (
    <>
      <Helmet>
        <title>Registrar Participação</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="strech"
          spacing={3}
        >
          <Grid item xs={12}>
            <RegistrarParticipacao Evento={evento} />
          </Grid>
        </Grid>
      </Container>
    </>
  ) : (
    <>
      <Helmet>
        <title>Registrar Participação</title>
      </Helmet>
      <SuspenseLoader />
    </>
  );
}

export default ApplicationRegistrarParticipacao;
