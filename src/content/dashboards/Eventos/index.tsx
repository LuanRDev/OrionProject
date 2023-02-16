import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountSecurity from './AccountSecurity';
import Eventos from './Eventos';
import GraficosLista from './GraficosLista';

function DashboardCrypto() {
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
          {/* <Grid item xs={12}>
            <AccountBalance />
          </Grid> */}
          <Grid item lg={8} xs={12}>
            <Eventos />
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
