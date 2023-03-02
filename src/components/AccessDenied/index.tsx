import { Box, Typography } from '@mui/material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
function AccessDenied() {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <DoDisturbIcon sx={{ fontSize: 128, color: '#5569ff' }} />
      </Box>

      <Typography variant="h4">
        Parece que você não tem permissão para acessar essa área...
      </Typography>
    </Box>
  );
}

export default AccessDenied;
