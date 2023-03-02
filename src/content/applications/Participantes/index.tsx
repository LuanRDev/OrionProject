import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '../../../components/Footer';
import Participantes from './Participantes';
import SuspenseLoader from '../../../components/SuspenseLoader';
import { useEffect, useState } from 'react';
import { Participante } from '../../../models/participante';
import { apiParticipantes } from '../../../core/services/api/axios';
import AccessDenied from '../../../components/AccessDenied';

function ApplicationsParticipantes() {
  const [isLoading, setIsLoading] = useState(true);
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  useEffect(() => {
    async function GetParticipantes() {
      try {
        await apiParticipantes
          .get('/api/participantes')
          .then((result) => setParticipantes(result.data));
      } catch (error) {
        console.log(error);
        if (error.response.status == 403) {
          return <AccessDenied />;
        }
      }
    }
    if (participantes.length === 0) {
      GetParticipantes();
    }
    setIsLoading(false);
  });
  if (isLoading === true) {
    return <SuspenseLoader />;
  }
  return participantes.length !== 0 ? (
    <>
      <Helmet>
        <title>Participantes - Projeto Orion</title>
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
          spacing={3}
        >
          <Grid item xs={12}>
            <Participantes Participantes={participantes} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  ) : (
    <>
      <Helmet>
        <title>Participantes - Projeto Orion</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <SuspenseLoader />
    </>
  );
}

export default ApplicationsParticipantes;
