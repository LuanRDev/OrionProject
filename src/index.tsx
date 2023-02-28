import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from '../src/App';
import { SidebarProvider } from '../src/contexts/SidebarContext';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { initialConfig, keycloak } from './core/auth';
import SuspenseLoader from './components/SuspenseLoader';

ReactDOM.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={initialConfig}
    LoadingComponent={<SuspenseLoader />}
  >
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
    ,
  </ReactKeycloakProvider>,
  document.getElementById('root')
);
