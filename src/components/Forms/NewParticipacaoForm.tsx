import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { apiEventos } from '../../core/services/api/axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface PropsNewParticipacao {
  CodigoEvento: number;
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
      console.log(error);
    }
    reset();
  }

  return (
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
  );
};

export default NewParticipacaoForm;
