import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';

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
const RegistrarParticipacao = Loader(
  lazy(() => import('./content/applications/RegistrarParticipacao'))
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

const routes = (isLogged): RouteObject[] => [
  {
    path: '',
    element: !isLogged ? <SidebarLayout /> : <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboards/eventos" replace />
      },
      {
        path: 'eventos',
        element: <Navigate to="/dashboards/eventos" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
          {
            path: 'register-success',
            element: <SuccessRegister />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: !isLogged ? <BaseLayout /> : <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="eventos" replace />
      },
      {
        path: 'eventos',
        element: <Evento />
      }
    ]
  },
  {
    path: 'management',
    element: !isLogged ? <BaseLayout /> : <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="participantes" replace />
      },
      {
        path: 'participantes',
        element: <Participantes />
      },
      {
        path: 'eventos',
        element: <EventosApplication />
      },
      {
        path: 'eventos/:id',
        element: <EventosDetails />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/eventos',
    children: [
      {
        path: ':id/registrar-participacao',
        element: <RegistrarParticipacao />
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
