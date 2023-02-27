import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { Grid, Typography, Button, Hidden } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Helmet } from 'react-helmet-async';
const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);
function SuccessRegister() {
  return (
    <>
      <Helmet>
        <title>Registrado com sucesso</title>
      </Helmet>
      <MainContent>
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="stretch"
          spacing={0}
        >
          <Grid
            xs={12}
            md={6}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
              <Box textAlign="center">
                <img
                  alt="500"
                  height={260}
                  src="/static/images/status/500.svg"
                />
                <Typography variant="h2" sx={{ my: 2 }}>
                  Ocorreu um erro, tente novamente mais tarde.
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  O servidor encontrou um erro interno, por conta disso não foi
                  possível concluir sua requisição.
                </Typography>
                <Button href="/overview" variant="contained" sx={{ ml: 1 }}>
                  Go back
                </Button>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </MainContent>
    </>
  );
}

export default SuccessRegister;
