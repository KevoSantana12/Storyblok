import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { storyblokInit, apiPlugin, setComponents } from "@storyblok/react";

import App from './App';
import DestinationsPage from './pages/DestinationsPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles.css';
import Landing from './storyblok/stories/landing/Landing';
import Hero from './storyblok/stories/landing/Hero';
import DestinationGrid from './storyblok/stories/landing/DestinationGrid';
import FeatureGrid from './storyblok/stories/landing/FeatureGrid';
import Feature from './storyblok/stories/landing/Feature';
import CtaBanner from './storyblok/stories/landing/CtaBanner';
import Destination from './storyblok/stories/destinations/Destination';
import StoryPage from './pages/StoryPage';


storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    landing: Landing,
    hero: Hero,
    destination_grid: DestinationGrid,
    feature_grid: FeatureGrid,
    feature: Feature,
    cta_banner: CtaBanner,
    destination: Destination,
  },
  apiOptions: {
    region: "eu",
  },
});

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { path: '/destinations', Component: DestinationsPage },
      { path: '/*', Component: StoryPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);

// @ts-ignore
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
