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

function ApplicationRegistrarParticipacao() {
  const [isLoading, setIsLoading] = useState(false);
  //const [evento, setEvento] = useState<Evento>();
  const eventomock: Evento = {
    id: 1,
    cargaHoraria: 2,
    dataRealizado: '2323',
    conteudoEventos: [],
    descricao: '',
    empresa: 'teste',
    inativo: false,
    instrutor: 'luna',
    participacoesConfirmadas: 2,
    participantesEsperados: 10,
    tipoEvento: 2
  };
  const { id } = useParams();

  /*useEffect(() => {
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
    }
    getData();
  }, []);*/
  return eventomock !== undefined && eventomock.id !== undefined ? (
    <>
      <Helmet>
        <title>Registrar Participação</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader Evento={eventomock} />
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
            <RegistrarParticipacao Evento={eventomock} />
          </Grid>
        </Grid>
      </Container>
    </>
  ) : (
    <SuspenseLoader />
  );
}

export default ApplicationRegistrarParticipacao;
