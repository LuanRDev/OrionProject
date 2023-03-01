import { zodResolver } from '@hookform/resolvers/zod';
import {
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Stack,
  Slide,
  SlideProps
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiEventos } from '../../core/services/api/axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface PropsNewParticipacao {
  CodigoEvento: number;
}

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}
const registrarParticipacaoFormSchema = z.object({
  nomeParticipante: z.string(),
  documentoParticipante: z.number()
});

type RegistrarParticipacaoFormInput = z.infer<
  typeof registrarParticipacaoFormSchema
>;
const NewParticipacaoForm = ({ CodigoEvento }: PropsNewParticipacao) => {
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState<string>('');
  const handleCloseSnack = () => {
    setOpenSnack(false);
  };
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<RegistrarParticipacaoFormInput>({
    resolver: zodResolver(registrarParticipacaoFormSchema)
  });

  async function handleRegistrarParticipacao(
    data: RegistrarParticipacaoFormInput
  ) {
    const { nomeParticipante, documentoParticipante } = data;

    try {
      await apiEventos.post(
        `api/eventos/${CodigoEvento}/registrar-participacao`,
        {
          nomeParticipante,
          documentoParticipante
        }
      );
      navigate('/status/register-success');
    } catch (error) {
      setSnackMessage('Ops! Ocorreu um erro ao registrar sua participação.');
      setOpenSnack(true);
      console.log(error);
    }
    reset();
  }

  return (
    <Stack>
      <Snackbar
        autoHideDuration={2000}
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
      <form onSubmit={handleSubmit(handleRegistrarParticipacao)}>
        <Typography variant="body1">
          Nome
          <br />
          <TextField type={'text'} {...register('nomeParticipante')} required />
        </Typography>
        <Typography variant="body1">
          Documento (CPF)
          <br />
          <TextField
            type={'number'}
            {...register('documentoParticipante')}
            required
          />
        </Typography>
        <Button size="large" type="submit" disabled={isSubmitting}>
          Registrar
        </Button>
      </form>
    </Stack>
  );
};

export default NewParticipacaoForm;
