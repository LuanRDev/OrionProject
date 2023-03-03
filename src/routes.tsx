import { ReactKeycloakProvider } from '@react-keycloak/web';
import SuspenseLoader from './components/SuspenseLoader';
import { initialConfig, keycloak } from './core/auth';
import { PublicRoutes } from './publicRoutes';
import { Router } from './router';

function Routes() {
  return (
    <>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={initialConfig}
        LoadingComponent={<SuspenseLoader />}
      >
        <Router />
      </ReactKeycloakProvider>
      <PublicRoutes />
    </>
  );
}

export default Routes;
