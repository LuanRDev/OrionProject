import { Router } from './router';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
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
