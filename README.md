# Rumbo · travel blog (React)

A small React + Vite site built from the Rumbo design. The content is static for now (hard-coded in the pages and in `src/data/destinations.js`), ready to be connected to a CMS.

```bash
npm install
npm run dev      # http://localhost:5173
```

## Pages

| Route | File |
| --- | --- |
| `/` | `src/pages/HomePage.jsx` |
| `/destinations` | `src/pages/DestinationsPage.jsx` |
| `/destinations/:slug` | `src/pages/DestinationPage.jsx` |
| anything else | `src/pages/NotFoundPage.jsx` |

## Components

All in `src/components/`, each receives its content through props:

- `Header`, `Footer` — site navigation
- `Hero` — `headline`, `subheadline`, `image`, `ctaText`, `ctaLink`
- `DestinationGrid` — `headline`, `intro`, `moreText`, `moreLink`, `destinations`
- `DestinationCard` — `slug`, `title`, `country`, `summary`, `image`
- `FeatureGrid` — `headline`, `intro`, `items`
- `Feature` — `icon` (`compass` | `leaf` | `map`), `title`, `text`
- `CtaBanner` — `headline`, `text`, `buttonText`
- `PageHeader` — `headline`, `intro`, `crumb`

Styles live in `src/styles.css`.

## Deploy

`vercel.json` and `netlify.toml` send every route to `index.html`, so client-side routing works on Vercel and Netlify.
