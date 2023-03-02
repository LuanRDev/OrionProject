import styled from '@emotion/styled';
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
        <Container maxWidth="md">
          <Box textAlign="center">
            <img
              alt="500"
              height={260}
              src="/static/images/status/success.svg"
            />
            <Typography variant="h2" sx={{ my: 2 }}>
              Sua participação foi registrada com sucesso! Obrigado pela
              contribuição.
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              Você pode agora fechar essa página.
            </Typography>
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default SuccessRegister;
