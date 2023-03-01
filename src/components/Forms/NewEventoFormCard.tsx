import {
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Slide,
  SlideProps,
  Alert,
  Snackbar
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { apiEventos } from '../../core/services/api/axios';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { TipoEvento } from '../../models/tipo_evento';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
interface PropsNovoEvento {
  TiposEventos: TipoEvento[] | undefined;
}

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const adicionarEventoFormSchema = z.object({
  descricao: z.string(),
  empresa: z.string(),
  instrutor: z.string(),
  participantesEsperados: z.number(),
  dataRealizado: z.string(),
  cargaHoraria: z.number(),
  conteudoEvento: z.instanceof(FileList)
});

type AdicionarEventoFormInput = z.infer<typeof adicionarEventoFormSchema>;

const NewEventoFormCard = ({ TiposEventos }: PropsNovoEvento) => {
  const [filesNames, setFilesNames] = useState<string[]>([]);
  const [filesBase64, setFilesBase64] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState<string>('');
  const [selectTipoEvento, setSelectTipoEvento] = useState<number | string>(1);

  const handleCloseModal = () => setOpenModal(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleCloseSnack = () => {
    setOpenSnack(false);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setSelectTipoEvento(event.target.value as string);
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<AdicionarEventoFormInput>({
    resolver: zodResolver(adicionarEventoFormSchema)
  });

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

  async function handleAdicionarEvento(data: AdicionarEventoFormInput) {
    const {
      descricao,
      empresa,
      instrutor,
      dataRealizado,
      cargaHoraria,
      participantesEsperados
    } = data;
    try {
      await apiEventos.post(`/api/eventos`, {
        descricao,
        empresa,
        tipoEvento: selectTipoEvento,
        instrutor,
        dataRealizado,
        cargaHoraria,
        participantesEsperados,
        arquivosBase64: filesBase64
      });
      setFilesBase64([]);
      setFilesNames([]);
      handleCloseModal();
      setRefreshKey((oldKey) => oldKey + 1);
    } catch (error) {
      setSnackMessage('Ops! Ocorreu um erro ao adicionar o evento.');
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
      <AddTwoToneIcon fontSize="large" onClick={handleClickOpen} />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <form onSubmit={handleSubmit(handleAdicionarEvento)}>
          <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Novo Evento
          </CustomDialogTitle>
          <DialogContent dividers>
            <CardContent>
              <Typography variant="h5">
                Empresa - Tipo de evento
                <br />
                <TextField type={'text'} {...register('empresa')} />
                <Select onChange={handleChange} defaultValue={'1'}>
                  {TiposEventos.map((tipo) => (
                    <MenuItem value={tipo.id} key={tipo.id}>
                      {tipo.tipoDescricao}
                    </MenuItem>
                  ))}
                </Select>
              </Typography>
              <Typography variant="h6">
                Data do evento:
                <br />
                <TextField
                  fullWidth
                  type={'datetime-local'}
                  {...register('dataRealizado')}
                />
              </Typography>
              <Typography variant="h6">
                Descrição:
                <br />
                <TextField type={'text'} {...register('descricao')} multiline />
              </Typography>
              <Typography variant="h6">
                Carga Horária (Horas):
                <br />
                <TextField
                  type={'number'}
                  {...register('cargaHoraria', { valueAsNumber: true })}
                />
              </Typography>
              <Typography variant="h6">
                Instrutor:
                <br />
                <TextField type={'text'} {...register('instrutor')} />
              </Typography>
              <Typography variant="h6">
                Participantes esperados:
                <br />
                <TextField
                  type={'number'}
                  {...register('participantesEsperados', {
                    valueAsNumber: true
                  })}
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
                <br />
                {filesNames.length > 0 ? (
                  <Typography>
                    Arquivos selecionados:
                    {filesNames.map((fileName) => (
                      <>
                        <br />
                        <Typography variant="caption">{fileName}</Typography>
                      </>
                    ))}
                  </Typography>
                ) : (
                  ''
                )}
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
              onClick={handleClose}
            >
              Aplicar alterações
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Stack>
  );
};

export default NewEventoFormCard;
