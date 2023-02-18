import {
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Alert,
  Snackbar,
  Slide,
  SlideProps
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiEventos } from '../../core/services/api/axios';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Evento } from '../../models/evento';
import { TipoEvento } from '../../models/tipo_evento';
import { useNavigate } from 'react-router-dom';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
interface PropsEditarEvento {
  Evento: Evento | undefined;
  TiposEventos: TipoEvento[] | undefined;
}

const editarEventoFormSchema = z.object({
  descricao: z.string(),
  empresa: z.string(),
  instrutor: z.string(),
  dataRealizado: z.string(),
  cargaHoraria: z.number(),
  participantesEsperados: z.number(),
  conteudoEvento: z.instanceof(FileList)
});

type EditarEventoFormInput = z.infer<typeof editarEventoFormSchema>;

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const EditEventoForm = ({ Evento, TiposEventos }: PropsEditarEvento) => {
  const [snackMessage, setSnackMessage] = useState<string>('');
  const [openSnack, setOpenSnack] = useState(false);
  const [filesBase64, setFilesBase64] = useState<string[]>([]);
  const [filesNames, setFilesNames] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectTipoEvento, setSelectTipoEvento] = useState<number | string>(
    Evento?.tipoEvento || 1
  );
  const navigate = useNavigate();

  function CustomDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectTipoEvento(event.target.value as string);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<EditarEventoFormInput>({
    resolver: zodResolver(editarEventoFormSchema)
  });

  function converterArquivo(files: FileList) {
    if (files) {
      const fileRef = files[0];
      const fileType: string = fileRef.type || '';
      setFilesNames((existing) => [...existing, fileRef.name]);
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        var newFile = `${fileRef.name}|data:${fileType};base64,${btoa(
          ev.target.result
        )}`;
        setFilesBase64((existing) => [...existing, newFile]);
      };
    }
  }

  async function handleEditarEvento(data: EditarEventoFormInput) {
    const {
      descricao,
      empresa,
      instrutor,
      dataRealizado,
      cargaHoraria,
      participantesEsperados
    } = data;
    try {
      await apiEventos.put(`/api/eventos/${Evento?.id}`, {
        descricao,
        empresa,
        tipoEvento: selectTipoEvento,
        instrutor,
        dataRealizado,
        cargaHoraria,
        participantesEsperados,
        conteudoEvento: filesBase64
      });
      handleClose();
      navigate(0);
    } catch (error) {
      setSnackMessage('Ops! Ocorreu um erro ao editar os dados do evento.');
      setOpenSnack(true);
      console.log(error);
    }
    reset();
  }

  return (
    <Stack>
      <Snackbar
        autoHideDuration={6000}
        open={openSnack}
        onClose={handleClose}
        TransitionComponent={TransitionUp}
      >
        <Alert severity="error">{snackMessage}</Alert>
      </Snackbar>
      <Button
        size="small"
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<EditIcon fontSize="small" />}
      >
        Editar evento
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <form onSubmit={handleSubmit(handleEditarEvento)}>
          <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Editar Evento
          </CustomDialogTitle>
          <DialogContent dividers>
            <CardContent>
              <Typography variant="h5">
                Empresa - Tipo de evento
                <br />
                <TextField
                  type={'text'}
                  {...register('empresa')}
                  defaultValue={Evento?.empresa}
                />
                <Select onChange={handleChange} defaultValue={'1'}>
                  {TiposEventos.map((tipo, index) => (
                    <MenuItem value={tipo.id} key={index}>
                      {tipo.tipoDescricao}
                    </MenuItem>
                  ))}
                </Select>
              </Typography>
              <Typography variant="h6">
                Data do evento:
                <br />
                <TextField
                  type={'datetime-local'}
                  {...register('dataRealizado')}
                  defaultValue={Evento?.dataRealizado.substring(0, 16)}
                />
              </Typography>
              <Typography variant="h6">
                Descrição:
                <br />
                <TextField
                  type={'text'}
                  {...register('descricao')}
                  multiline
                  defaultValue={Evento?.descricao}
                />
              </Typography>
              <Typography variant="h6">
                Carga Horária:
                <br />
                <TextField
                  type={'number'}
                  {...register('cargaHoraria', { valueAsNumber: true })}
                  defaultValue={Evento?.cargaHoraria}
                />
              </Typography>
              <Typography variant="h6">
                Instrutor:
                <br />
                <TextField
                  type={'text'}
                  {...register('instrutor')}
                  defaultValue={Evento?.instrutor}
                />
              </Typography>
              <Typography variant="h6">
                Participantes esperados:
                <br />
                <TextField
                  type={'number'}
                  {...register('participantesEsperados', {
                    valueAsNumber: true
                  })}
                  defaultValue={Evento?.participantesEsperados}
                />
              </Typography>
              <Typography>
                Conteudo:
                <br />
                <input
                  type={'file'}
                  {...register('conteudoEvento')}
                  onChange={(e) => converterArquivo(e.target.files)}
                />
              </Typography>
            </CardContent>
          </DialogContent>
          <DialogActions>
            <Button
              size="large"
              autoFocus
              variant="outlined"
              type="submit"
              disabled={isSubmitting}
            >
              Aplicar alterações
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Stack>
  );
};

export default EditEventoForm;
