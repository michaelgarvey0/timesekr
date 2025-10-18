import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout } from '~/components/DashboardLayout';
import { LoadingScreen } from '~/components/LoadingScreen';
import { AppProviders } from '~/context/AppProviders';
import { Account } from '~/routes/Account';
import { Analytics } from '~/routes/Analytics';
import { Changelog } from '~/routes/Changelog';
import { Charts } from '~/routes/Charts';
import { Checkout } from '~/routes/Checkout';
import { Directory } from '~/routes/Directory';
import { Error404 } from '~/routes/Error404';
import { Events } from '~/routes/Events';
import { Home } from '~/routes/Home';
import { Homepage } from '~/routes/Homepage';
import { Landing } from '~/routes/Landing';
import { Login } from '~/routes/Login';
import { Orders } from '~/routes/Orders';
import { Pivot } from '~/routes/Pivot';
import { Register } from '~/routes/Register';
import { Speakers } from '~/routes/Speakers';

export const ALL_ROUTES = [
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/landing',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/changelog',
    element: <Changelog />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'speakers',
        element: <Speakers />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'charts',
        element: <Charts />,
      },
      {
        path: 'directory',
        element: <Directory />,
      },
      {
        path: 'pivot',
        element: <Pivot />,
      },
    ],
  },
  // add a 404 route
  {
    path: '*',
    element: <Error404 />,
  },
];
const router = createBrowserRouter(ALL_ROUTES);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <React.Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </AppProviders>
  </React.StrictMode>,
);
