import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import App from './App';
import DestinationPage from './pages/DestinationPage';
import DestinationsPage from './pages/DestinationsPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import './styles.css';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { path: '/', Component: HomePage },
      { path: '/destinations', Component: DestinationsPage },
      { path: '/destinations/:slug', Component: DestinationPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
