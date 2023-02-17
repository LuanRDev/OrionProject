import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { apiEventos } from 'src/core/services/api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface DeleteEventoProps {
  id: number;
}

const DeleteEventoForm = ({ id }: DeleteEventoProps) => {
  const [snackMessage, setSnackMessage] = useState<string>('');
  const [openSnack, setOpenSnack] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

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

  async function excluirEvento() {
    try {
      await apiEventos.delete(`/api/eventos/${id}`);
      handleClose();
      navigate('/management/eventos');
      handleClose();
    } catch (error) {
      handleClose();
      setSnackMessage('Ops! Ocorreu um erro ao excluir o evento.');
      setOpenSnack(true);
      console.log(error);
    }
  }
  return (
    <Stack>
      <Button
        size="small"
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon fontSize="small" />}
      >
        Excluir evento
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Excluir Evento
        </CustomDialogTitle>
        <DialogContent dividers>
          <Typography>Voce tem certeza que deseja excluir o evento?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            autoFocus
            variant="outlined"
            onClick={() => {
              excluirEvento();
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default DeleteEventoForm;
