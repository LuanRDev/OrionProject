import { useRoutes } from 'react-router-dom';
import router from './router';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { useKeycloak } from '@react-keycloak/web';
import SuspenseLoader from './components/SuspenseLoader';

function App() {
  const initialized = useKeycloak();
  const content = useRoutes(router);
  if (!initialized) return <SuspenseLoader />;
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
