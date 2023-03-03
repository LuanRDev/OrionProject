import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router';

import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

//Applications
const RegistrarParticipacao = Loader(
  lazy(() => import('./content/applications/RegistrarParticipacao'))
);

// Status
const Status404 = Loader(
  lazy(() => import('./content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('./content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('./content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('./content/pages/Status/Maintenance'))
);
const SuccessRegister = Loader(
  lazy(() => import('./content/pages/Status/SuccessRegister'))
);

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="" element={<BaseLayout />}>
        <Route path="status" element={<Navigate to="404" replace />}>
          <Route path="404" element={<Status404 />} />
          <Route path="500" element={<Status500 />} />
          <Route path="maintenance" element={<StatusMaintenance />} />
          <Route path="coming-soon" element={<StatusComingSoon />} />
          <Route path="register-success" element={<SuccessRegister />} />
        </Route>
        <Route path="*" element={<Status404 />} />
        <Route
          path="eventos/:id/registrar-participacao"
          element={<RegistrarParticipacao />}
        />
      </Route>
    </Routes>
  );
}
