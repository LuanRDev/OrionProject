import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Button,
  Typography,
  Box,
  styled,
  FormControl,
  OutlinedInput,
  Alert,
  Snackbar,
  Slide,
  SlideProps
} from '@mui/material';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import RegistrarParticipacao from './RegistrarParticipacao';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Evento } from '../../../models/evento';
import { apiEventos } from '../../../core/services/api/axios';
import SuspenseLoader from '../../../components/SuspenseLoader';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import request from 'axios';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}
const hashEventoFormSchema = z.object({
  eventoHash: z.string()
});

type HashEventoFormInput = z.infer<typeof hashEventoFormSchema>;

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function ApplicationRegistrarParticipacao() {
  const [isLoading, setIsLoading] = useState(false);
  const [evento, setEvento] = useState<Evento>();
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState<string>('');

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const hash = params.hashEvento;
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<HashEventoFormInput>({
    resolver: zodResolver(hashEventoFormSchema)
  });

  async function handleChecarHash(data: HashEventoFormInput) {
    try {
      await apiEventos
        .get(`/api/eventos/public/${id}?hashCode=${data.eventoHash}`)
        .then((result) => {
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
        if (error.response.status == 400) {
          setSnackMessage('O Hash informado está incorreto.');
          setOpenSnack(true);
        }
      }
    }
    reset();
  }

  useEffect(() => {
    const getData = (hashCode: string) => {
      try {
        apiEventos
          .get(`/api/eventos/public/${id}?hashCode=${hashCode}`)
          .then((result) => {
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
    };
    if (hash !== undefined) {
      getData(hash);
    }
  }, [hash]);

  if (isLoading) {
    <SuspenseLoader />;
  }
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
      <MainContent>
        <Container maxWidth="md">
          <Snackbar
            autoHideDuration={6000}
            open={openSnack}
            onClose={handleCloseSnack}
            TransitionComponent={TransitionUp}
            sx={{ zIndex: 999 }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="error" onClose={handleCloseSnack}>
              {snackMessage}
            </Alert>
          </Snackbar>
          <Box textAlign="center">
            <Typography variant="h3">
              Informe o Hash do evento para acessar o conteúdo.
            </Typography>
          </Box>
          <Container maxWidth="md">
            <form onSubmit={handleSubmit(handleChecarHash)}>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  type="text"
                  placeholder="Hash do evento"
                  {...register('eventoHash')}
                  required
                />
                <Button size="large" type="submit" disabled={isSubmitting}>
                  Acessar
                </Button>
              </FormControl>
            </form>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default ApplicationRegistrarParticipacao;
