import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Route, RouteObject, Routes } from 'react-router';

import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';
import AuthProvider from './authProvider';
import Status500 from './content/pages/Status/Status500';
import RegistrarParticipacao from './content/applications/RegistrarParticipacao';
import StatusComingSoon from './content/pages/Status/ComingSoon';
import StatusMaintenance from './content/pages/Status/Maintenance';
import SuccessRegister from './content/pages/Status/SuccessRegister';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

// Dashboards

const Evento = Loader(lazy(() => import('./content/dashboards/Eventos')));

// Applications
const Participantes = Loader(
  lazy(() => import('./content/applications/Participantes'))
);
const EventosApplication = Loader(
  lazy(() => import('./content/applications/Eventos'))
);
const EventosDetails = Loader(
  lazy(() => import('./content/applications/EventosDetails'))
);
const UserProfile = Loader(
  lazy(() => import('./content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('./content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('./content/pages/Components/Buttons'))
);
const Modals = Loader(lazy(() => import('./content/pages/Components/Modals')));
const Accordions = Loader(
  lazy(() => import('./content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('./content/pages/Components/Tabs')));
const Badges = Loader(lazy(() => import('./content/pages/Components/Badges')));
const Tooltips = Loader(
  lazy(() => import('./content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('./content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('./content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('./content/pages/Components/Forms')));

const Status404 = Loader(
  lazy(() => import('./content/pages/Status/Status404'))
);

export function Router() {
  return (
    <Routes>
      <Route element={<AuthProvider />}>
        <Route element={<BaseLayout />}>
          <Route
            path="/"
            element={<Navigate to="/dashboards/eventos" replace />}
          />
          <Route
            path="eventos"
            element={<Navigate to="/dashboards/eventos" replace />}
          />
          <Route path="dashboards" element={<SidebarLayout />}>
            <Route path="" element={<Navigate to="eventos" replace />} />
            <Route path="eventos" element={<Evento />} />
          </Route>
          <Route path="management" element={<SidebarLayout />}>
            <Route
              path="/management"
              element={<Navigate to="participantes" replace />}
            />
            <Route path="participantes" element={<Participantes />} />
            <Route path="eventos" element={<EventosApplication />} />
            <Route path="eventos/:id" element={<EventosDetails />} />
            <Route path="profile">
              <Route
                path="/management/profile"
                element={<Navigate to="details" replace />}
              />
              <Route path="details" element={<UserProfile />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>
          </Route>
          <Route path="components" element={<SidebarLayout />}>
            <Route
              path="/components"
              element={<Navigate to="buttons" replace />}
            />
            <Route path="buttons" element={<Buttons />} />
            <Route path="modals" element={<Modals />} />
            <Route path="accordions" element={<Accordions />} />
          </Route>
        </Route>
      </Route>
      <Route element={<BaseLayout />}>
        <Route path="status" element={<Navigate to="404" replace />}>
          <Route path="404" element={<Status404 />} />
          <Route path="500" element={<Status500 />} />
          <Route path="maintenance" element={<StatusMaintenance />} />
          <Route path="coming-soon" element={<StatusComingSoon />} />
          <Route path="register-success" element={<SuccessRegister />} />
        </Route>
        <Route
          path="eventos/:id/registrar-participacao"
          element={<RegistrarParticipacao />}
        />
      </Route>
      <Route path="*" element={<Status404 />} />
    </Routes>
  );
}
