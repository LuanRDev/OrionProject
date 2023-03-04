import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Outlet } from 'react-router-dom';
import SuspenseLoader from './components/SuspenseLoader';
import { initialConfig, keycloak } from './core/auth';
function AuthProvider() {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={initialConfig}
      LoadingComponent={<SuspenseLoader />}
    >
      <Outlet />
    </ReactKeycloakProvider>
  );
}

export default AuthProvider;
