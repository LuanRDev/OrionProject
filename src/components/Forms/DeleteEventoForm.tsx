import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Alert,
  Snackbar,
  Slide,
  SlideProps
} from '@mui/material';
import { useState } from 'react';
import { apiEventos } from '../../core/services/api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
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

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const DeleteEventoForm = ({ id }: DeleteEventoProps) => {
  const [snackMessage, setSnackMessage] = useState<string>('');
  const [openSnack, setOpenSnack] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseSnack = () => {
    setOpenSnack(false);
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
      if (location.pathname == `/management/eventos/${id}`) {
        navigate('/management/eventos');
      }
      navigate(0);
    } catch (error) {
      handleClose();
      setSnackMessage('Ops! Ocorreu um erro ao excluir o evento.');
      setOpenSnack(true);
      console.log(error);
    }
  }
  return (
    <Stack>
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
      <Button
        size="small"
        variant="contained"
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
