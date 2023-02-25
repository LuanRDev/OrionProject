import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { apiEventos } from '../../core/services/api/axios';
import { z } from 'zod';

interface PropsNewParticipacao {
  CodigoEvento: number;
}

const registrarParticipacaoFormSchema = z.object({
  nomeParticipante: z.string(),
  documentoParticipante: z.string()
});

type RegistrarParticipacaoFormInput = z.infer<
  typeof registrarParticipacaoFormSchema
>;
const NewParticipacaoForm = ({ CodigoEvento }: PropsNewParticipacao) => {
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
        <TextField type={'text'} {...register('nomeParticipante')} />
      </Typography>
      <Typography variant="body1">
        Documento
        <br />
        <TextField
          type={'text'}
          {...register('documentoParticipante', {
            valueAsNumber: true
          })}
        />
      </Typography>
      <Button size="large" type="submit" disabled={isSubmitting}>
        Registrar
      </Button>
    </form>
  );
};

export default NewParticipacaoForm;
