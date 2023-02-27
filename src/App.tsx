import { useRoutes } from 'react-router-dom';
import router from './router';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { initialConfig, keycloak } from './core/auth';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <ReactKeycloakProvider
          authClient={keycloak}
          initOptions={initialConfig}
        >
          {content}
        </ReactKeycloakProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
