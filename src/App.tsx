import { Router } from './router';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { keycloak, initialConfig } from './core/auth';
import SuspenseLoader from './components/SuspenseLoader';
import Routes from './routes';

function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Routes />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
