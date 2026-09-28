# Rumbo · Storyblok + React travel blog

A small travel blog built with **React + Vite** and **Storyblok** as a headless CMS. Pages are composed from Storyblok blocks, edited live in the Visual Editor, and part of the content model, assets and stories were created through the Storyblok Management API.

| | Link |
| --- | --- |
| Repository | [github.com/KevoSantana12/Storyblok](https://github.com/KevoSantana12/Storyblok) |
| Production (published content) | [storyblokpublished.netlify.app](https://storyblokpublished.netlify.app/) |
| Preview (draft / unpublished content + Visual Editor) | [storyblokprev.netlify.app](https://storyblokprev.netlify.app/) |

---

## Contents

1. [Features](#1-features)
2. [Stack and project structure](#2-stack-and-project-structure)
3. [Content model](#3-content-model)
4. [Building the site step by step](#4-building-the-site-step-by-step)
5. [Management API step by step](#5-management-api-step-by-step)
6. [Run it locally](#6-run-it-locally)
7. [Deployment: preview vs production](#7-deployment-preview-vs-production)
8. [Issues found and how I solved them](#8-issues-found-and-how-i-solved-them)

---

## 1. Features

| Feature | How it works | Where |
| --- | --- | --- |
| **Storyblok as headless CMS** | React + Vite app based on the official *Integrate React with Storyblok* guide: `storyblokInit` + `apiPlugin`, `useStoryblok`, `StoryblokComponent` and one React component per Storyblok block. | `src/main.tsx`, `src/storyblok/` |
| **Draft content** | Every Content Delivery API request sends `version`, read from `VITE_STORYBLOK_VERSION` (`draft` locally and in the preview deployment). | `src/storyblok/config.ts`, `src/pages/StoryPage.tsx`, `DestinationGrid.tsx`, `DestinationsPage.tsx` |
| **Live editing** | `useStoryblok` loads the Storyblok Bridge and re-renders on every keystroke in the Visual Editor. Every block spreads `{...storyblokEditable(blok)}` so it can be clicked in the preview. The local dev server runs on HTTPS, as the Visual Editor requires. | `src/storyblok/`, `vite.config.ts` |
| **Dynamic routing** | One catch-all route: the URL becomes a slug, the slug loads a story, and the story's content type picks the React component. New pages need no code. | `src/pages/StoryPage.tsx` |
| **Preview and production deployments** | Same code deployed to two **Netlify** sites with different environment variables: preview (Preview token + `draft`) and production (Public token + `published`). The Bridge only loads in draft mode. | [Section 7](#7-deployment-preview-vs-production) |
| **Content type created with the Management API** | `destination` created with `POST /v1/spaces/:space_id/components/` (`is_root: true`, `is_nestable: false`). | [Section 5.2](#52-create-the-destination-content-type) |
| **Image upload with the Management API** | Three-step signed upload: signed response → S3 multipart upload → `finish_upload`. | [Section 5.4](#54-upload-the-image-asset-3-requests) |
| **Story created with the Management API** | *Calm Bay* created with `POST /v1/spaces/:space_id/stories`, based on the `destination` type, with the uploaded image as its cover. | [Section 5.5](#55-create-the-story) |

---

## 2. Stack and project structure

- **React 19 + Vite**, **TypeScript**
- **React Router 7** — one catch-all route; Storyblok decides what each URL shows
- **@storyblok/react** — `storyblokInit`, `apiPlugin`, `useStoryblok`, `useStoryblokApi`, `StoryblokComponent`, `storyblokEditable`, `StoryblokRichText`
- **vite-plugin-mkcert** — local HTTPS for the Visual Editor
- **Postman** — Management API requests
- The visual design was prototyped in Claude Design and then rebuilt as React components.

```
src/
├── main.tsx                     storyblokInit + component registry + router
├── App.tsx                      layout (Header, <Outlet />, Footer)
├── storyblok/
│   ├── config.ts                reads VITE_STORYBLOK_VERSION (draft | published)
│   └── stories/
│       ├── landing/             blocks used by pages of type "landing"
│       │   ├── Landing.tsx        content type: renders blok.body
│       │   ├── Hero.tsx
│       │   ├── FeatureGrid.tsx    renders nested "feature" blocks
│       │   ├── Feature.tsx
│       │   ├── DestinationGrid.tsx  fetches destination stories from the API
│       │   └── Utils/Icons.tsx
│       └── destinations/
│           └── Destination.tsx  content type: one destination page
├── pages/
│   ├── StoryPage.tsx            URL → slug → story → StoryblokComponent
│   └── DestinationsPage.tsx     /destinations: list of all destinations
└── components/                  not Storyblok blocks (plain props)
    ├── Header.tsx, Footer.tsx
    ├── DestinationCard.tsx
    └── Loader.tsx               loading animation while requests are pending
```

---

## 3. Content model

### Stories in the space

```
Content
├── landing                     (content type: landing)      → /
└── Destinations/               (folder)
    └── Calm Bay                (content type: destination)  → /destinations/calm-bay
```

`/destinations` is a React page that lists every story of type `destination` inside the folder, fetched from the Content Delivery API.

### Content types

**`landing`** — the home page
| Field | Type |
| --- | --- |
| `body` | Blocks |

**`destination`** — one destination page *(created with the Management API)*
| Field | Type | Used for |
| --- | --- | --- |
| `title` | Text | Page title, card title |
| `country` | Text | Eyebrow, card |
| `region` | Text | Eyebrow |
| `summary` | Textarea | Card text |
| `best_time_to_visit` | Text | Metadata |
| `author` | Text | Metadata + initials avatar |
| `cover_image` | Asset (images) | Cover photo, card image |
| `body` | Richtext | Article: headings, paragraphs, inline image with caption |

The publish date is not a field: it comes from the story's `first_published_at`.

### Nestable blocks (inside `landing.body`)

| Block | Fields |
| --- | --- |
| `hero` | `headline` Text · `subheadline` Textarea · `image` Asset · `cta_text` Text · `cta_link` Link |
| `destination_grid` | `headline` Text · `intro` Textarea · `more_text` Text · `more_link` Link · `limit` Number |
| `feature_grid` | `headline` Text · `intro` Textarea · `items` Blocks (only `feature`) |
| `feature` | `icon` Single-Option (`compass`, `leaf`, `map`) · `title` Text · `text` Textarea |

> **Rule of thumb:** content types define *pages* (they have their own URL, publish state and can be queried); nestable blocks define *sections* inside a page.

---

## 4. Building the site step by step

### 4.1 Design and static React version
1. Designed the site (home, destinations list, destination detail; desktop and mobile) in Claude Design.
2. Rebuilt it as a plain React + Vite project with static content, each section as its own component with props (`Hero`, `FeatureGrid`, `DestinationGrid`, `DestinationCard`, …).

### 4.2 Connect Storyblok (following the React Quickstart)
1. Created a Storyblok space (EU region) and copied the **Preview** access token into `.env`.
2. Installed `@storyblok/react` and initialised it once in `main.tsx`:

   ```tsx
   const components = {
     landing: Landing,
     hero: Hero,
     feature_grid: FeatureGrid,
     feature: Feature,
     destination_grid: DestinationGrid,
     destination: Destination,
   };

   storyblokInit({
     accessToken: import.meta.env.VITE_STORYBLOK_DELIVERY_API_TOKEN,
     use: [apiPlugin],
     bridge: isDraft,
     components,
     apiOptions: { region: 'eu' },
   });
   ```

   The **keys** of `components` must match the technical names in Storyblok exactly (`landing`, not `Landing` or `page`).

3. **Converted each component to a Storyblok block**: it now receives a single `blok` prop, reads its fields in snake_case (`blok.cta_text`), and spreads `storyblokEditable(blok)` on its root element. Asset and Link fields are objects (`blok.image.filename`, `blok.cta_link.cached_url`). Types extend `SbBlokData`:

   ```tsx
   interface HeroBlok extends SbBlokData {
     headline: string;
     subheadline?: string;
     image?: { filename: string; alt?: string };
     cta_text?: string;
     cta_link?: { cached_url: string };
   }

   export default function Hero({ blok }: { blok: HeroBlok }) {
     return <section className="hero" {...storyblokEditable(blok)}>…</section>;
   }
   ```

4. **Nested blocks** (`Landing.body`, `FeatureGrid.items`) are rendered with `StoryblokComponent`, exactly like `Page`/`Grid` in the Quickstart:

   ```tsx
   {blok.body?.map((nestedBlok) => (
     <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
   ))}
   ```

5. Created the blocks in the **Block Library** and built the `landing` story by adding `hero`, `destination_grid`, `feature_grid` (with three `feature` items) to its `body`.

### 4.3 Dynamic routing (Storyblok decides the pages)
Instead of one React route per page, a single catch-all route renders any story:

```tsx
// main.tsx
{ path: '/destinations', Component: DestinationsPage },
{ path: '/*', Component: StoryPage },
```

```tsx
// StoryPage.tsx
const path = params['*']?.replace(/\/$/, '');
const slug = path || 'landing';                 // "/" → landing, "/destinations/calm-bay" → destinations/calm-bay

const story = useStoryblok(slug, { version });
if (!story?.content) return <Loader />;

return <StoryblokComponent blok={story.content} story={story} />;
```

`StoryblokComponent` looks at the story's content type (`landing` or `destination`) and renders the matching React component. Passing `story` gives `Destination` access to `first_published_at`.

### 4.4 Destinations from the API
`DestinationGrid` and `DestinationsPage` query the Content Delivery API for every destination story:

```ts
api.get('cdn/stories', {
  version,
  starts_with: 'destinations/',   // only the destinations folder
  content_type: 'destination',    // only destination stories
  sort_by: 'first_published_at:desc',
  per_page: blok.limit ? Number(blok.limit) : 100,
});
```

New destinations appear automatically — no code change needed. The home page shows 3 (`limit = 3`), `/destinations` shows all.

### 4.5 Destination detail page and rich text
`Destination.tsx` renders the `destination` content type. The `body` rich text field is rendered with `StoryblokRichText`, overriding the `image` node so its `title` becomes a caption:

```tsx
<StoryblokRichText document={blok.body} className="prose" components={{ image: RichTextImage }} />

function RichTextImage({ attrs }: StoryblokReactRichTextProps<'image'>) {
  if (!attrs.src) return null;
  return (
    <figure className="prose__figure">
      <img src={attrs.src} alt={attrs.alt ?? ''} />
      {attrs.title && <figcaption>{attrs.title}</figcaption>}
    </figure>
  );
}
```

### 4.6 Live editing (Visual Editor)
1. Local HTTPS with `vite-plugin-mkcert` (only on `vite dev`):
   ```ts
   plugins: [react(), command === 'serve' && mkcert()].filter(Boolean)
   ```
2. **Settings → Visual Editor → Location:** `https://localhost:3000/` (and the preview deployment URL).
3. **landing story → Config → Real path:** `/` (the slug is `landing`, but the page lives at `/`).
4. `useStoryblok` registers the Bridge; `storyblokEditable` makes each block clickable.

Result: typing in the Visual Editor updates the page instantly, and clicking a section opens its fields.

### 4.7 Draft vs published
The version is not hard-coded; it comes from an environment variable read in one place:

```ts
// src/storyblok/config.ts
export const version =
  import.meta.env.VITE_STORYBLOK_VERSION === 'published' ? 'published' : 'draft';
export const isDraft = version === 'draft';
```

### 4.8 Loading state
A `Loader` component (the Rumbo compass with an animated needle, `role="status"`) is shown while a story or the destinations list is being fetched.

---

## 5. Management API step by step

All requests were made with **Postman** against the EU Management API base URL `https://mapi.storyblok.com/v1`. Space ID: `295475393123693`.

### 5.1 Authentication
The Management API needs a **Personal access token** (*My account → Personal access tokens*), **not** the Public/Preview tokens used by the frontend (those only read content).

- Header: `Authorization: <personal access token>` — sent as-is, **no `Bearer` prefix**.
- In Postman: *Authorization → API Key → Key `Authorization`, Add to `Header`*.
- The token acts with my user permissions across all spaces, so it is never committed or exposed in the frontend.

### 5.2 Create the `destination` content type

`POST https://mapi.storyblok.com/v1/spaces/295475393123693/components/`

```json
{
  "component": {
    "name": "destination",
    "display_name": "Destination",
    "is_root": true,
    "is_nestable": false,
    "schema": {
      "title":              { "type": "text", "pos": 0, "required": true },
      "country":            { "type": "text", "pos": 1 },
      "region":             { "type": "text", "pos": 2 },
      "summary":            { "type": "textarea", "pos": 3 },
      "best_time_to_visit": { "type": "text", "pos": 4 },
      "author":             { "type": "text", "pos": 5 },
      "cover_image":        { "type": "asset", "pos": 6, "filetypes": ["images"] },
      "body":               { "type": "richtext", "pos": 7 }
    }
  }
}
```

- `is_root: true` + `is_nestable: false` is what makes it a **Content Type** (a story can be created from it; it cannot be nested in another block).
- `pos` sets the order of the fields in the editor form.
- `filetypes: ["images"]` restricts the asset field to images.

**Response — `201 Created`** (trimmed):

```json
{
  "component": {
    "name": "destination",
    "display_name": "Destination",
    "id": 224724932566715,
    "is_root": true,
    "is_nestable": false,
    "schema": {
      "title":       { "type": "text", "pos": 0, "required": true, "id": "2v0W7HYeSPyC1_6PEfANbQ" },
      "cover_image": { "type": "asset", "pos": 6, "filetypes": ["images"], "id": "wkjAh8McRyuLdIabeof8Xg" },
      "body":        { "type": "richtext", "pos": 7, "id": "Yywg5Z_lRUe2iVeJOFYcrQ" }
    }
  }
}
```

### 5.3 Get the folder ID

The story must live in the `destinations` folder, so its ID is needed as `parent_id`.

`GET https://mapi.storyblok.com/v1/spaces/295475393123693/stories?folder_only=1&with_slug=destinations`

Response (trimmed): `"id": 224717188581039, "is_folder": true, "full_slug": "destinations"`.

### 5.4 Upload the image asset (3 requests)

The file is **not** sent to the Management API. Storyblok returns a **pre-signed form** and the file is uploaded straight to its Amazon S3 bucket; then Storyblok is told the upload finished.

```
Postman ── 1. POST /assets/ {filename, size} ──────▶ Management API
        ◀── signed response: id, post_url, fields ──
        ── 2. POST post_url (multipart: fields + file) ─▶ Amazon S3
        ◀── 204 No Content ─────────────────────────────
        ── 3. GET /assets/:id/finish_upload ─────────▶ Management API
        ◀── asset object (id, filename) ───────────────
```

#### Step 1 — Request a signed response

`POST https://mapi.storyblok.com/v1/spaces/295475393123693/assets/`

```json
{
  "filename": "Costa-Rica.jpg",
  "size": "1360X1020",
  "validate_upload": 1
}
```

| Field | Why |
| --- | --- |
| `filename` | Required; becomes the end of the public URL (Storyblok lower-cases it: `costa-rica.jpg`). |
| `size` | Image dimensions as `<width>X<height>` (capital X). |
| `validate_upload` | `1` makes step 3 validate the upload. |

**Response — `200 OK`** (signature values shortened):

```json
{
  "id": 224730298933117,
  "post_url": "https://s3.amazonaws.com/a.storyblok.com",
  "pretty_url": "//a.storyblok.com/f/295475393123693/1360X1020/a8ed2970fc/costa-rica.jpg",
  "public_url": "https://s3.amazonaws.com/a.storyblok.com/f/295475393123693/1360X1020/a8ed2970fc/costa-rica.jpg",
  "fields": {
    "acl": "public-read",
    "Cache-Control": "public, max-age=31536000",
    "Content-Type": "image/jpeg",
    "key": "f/295475393123693/1360X1020/a8ed2970fc/costa-rica.jpg",
    "policy": "eyJleHBpcmF0aW9uIjoiMjAyNi0wOS0yOFQwMDozOTo1NVoi…",
    "x-amz-credential": "AKIA…/20260928/us-east-1/s3/aws4_request",
    "x-amz-algorithm": "AWS4-HMAC-SHA256",
    "x-amz-date": "20260928T002955Z",
    "x-amz-signature": "b38f1b8e…"
  }
}
```

The `policy` + `x-amz-signature` pair authorises an upload to S3 **without AWS credentials**, but only for this exact `key` and `Content-Type`, and only for about **10 minutes** (decoding the base64 `policy` shows `"expiration": "2026-09-28T00:39:55Z"`, 10 minutes after `x-amz-date`). Steps 1 and 2 therefore have to be done back-to-back.

#### Step 2 — Upload the file to S3

`POST https://s3.amazonaws.com/a.storyblok.com` (the `post_url`)

- **Authorization: No Auth.** The Storyblok token must not be sent to S3.
- **Body: `form-data`**, one row per key of `fields`, copied exactly, and the file in the **last** row:

| Key | Type | Value |
| --- | --- | --- |
| `acl` | Text | `public-read` |
| `Cache-Control` | Text | `public, max-age=31536000` |
| `Content-Type` | Text | `image/jpeg` |
| `key` | Text | `f/295475393123693/1360X1020/a8ed2970fc/costa-rica.jpg` |
| `policy` | Text | *(full value)* |
| `x-amz-credential` | Text | *(full value)* |
| `x-amz-algorithm` | Text | `AWS4-HMAC-SHA256` |
| `x-amz-date` | Text | `20260928T002955Z` |
| `x-amz-signature` | Text | *(full value)* |
| `file` | **File** | `costa-rica.jpg` |

Tip: Postman's *Bulk Edit* pastes all text fields at once (`key:value` per line); the `file` row is then added manually as type *File*. Alternatively, a `curl` command with `--form "file=@path/to/image.jpg"` can be imported with *Import → Raw text*.

**Response — `204 No Content`** (empty body = success).

Equivalent `curl`:

```bash
curl -X POST "https://s3.amazonaws.com/a.storyblok.com" \
  -F "acl=public-read" \
  -F "Cache-Control=public, max-age=31536000" \
  -F "Content-Type=image/jpeg" \
  -F "key=f/295475393123693/1360X1020/a8ed2970fc/costa-rica.jpg" \
  -F "policy=…" \
  -F "x-amz-credential=…" \
  -F "x-amz-algorithm=AWS4-HMAC-SHA256" \
  -F "x-amz-date=20260928T002955Z" \
  -F "x-amz-signature=…" \
  -F "file=@costa-rica.jpg"
```

#### Step 3 — Finish the upload

`GET https://mapi.storyblok.com/v1/spaces/295475393123693/assets/224730298933117/finish_upload` (with the personal access token again, no body)

**Response — `200 OK`:**

```json
{
  "id": 224730298933117,
  "alt": null,
  "copyright": null,
  "filename": "https://a.storyblok.com/f/295475393123693/1360X1020/a8ed2970fc/costa-rica.jpg",
  "focus": null,
  "is_private": false,
  "title": null
}
```

The image is now in the **Assets** library and served from the Storyblok CDN:
`https://a.storyblok.com/f/295475393123693/1360X1020/a8ed2970fc/costa-rica.jpg`

The CDN URL (`pretty_url` / `filename`) is used rather than `public_url` (raw S3), because it is cached and works with the Image Service (e.g. `…/costa-rica.jpg/m/800x600`).

### 5.5 Create the story

`POST https://mapi.storyblok.com/v1/spaces/295475393123693/stories`

```json
{
  "publish": true,
  "story": {
    "name": "Calm Bay",
    "slug": "calm-bay",
    "parent_id": 224717188581039,
    "content": {
      "component": "destination",
      "title": "Calm Bay",
      "country": "Costa Rica",
      "region": "South Pacific",
      "summary": "A crescent of dark sand between two jungle headlands, perfect for switching off for three days.",
      "best_time_to_visit": "December to April, in the dry season",
      "author": "Lucía Andrade",
      "cover_image": {
        "fieldtype": "asset",
        "id": 224730298933117,
        "filename": "https://a.storyblok.com/f/295475393123693/1360X1020/a8ed2970fc/costa-rica.jpg",
        "alt": "Calm Bay beach between two jungle headlands"
      },
      "body": {
        "type": "doc",
        "content": [
          { "type": "paragraph", "content": [{ "type": "text", "text": "Some places announce themselves with signs; …" }] },
          { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "Getting there, slowly" }] },
          { "type": "paragraph", "content": [{ "type": "image", "attrs": {
              "src": "https://a.storyblok.com/f/295475393123693/1360X1020/a8ed2970fc/costa-rica.jpg",
              "alt": "The northern headland at sunset",
              "title": "The northern headland at sunset, seen from the lookout trail." } }] }
        ]
      }
    }
  }
}
```

*(`body` shortened here; the full request contains every paragraph and heading of the article.)*

What makes this story "based on the new content type":
- `content.component: "destination"` — the technical name from step 5.2. The editor uses it to show the Destination fields; the frontend uses it to render `<Destination />`.
- The other keys of `content` match the field names of the schema.
- **The asset field stores an object**, not just a URL: `fieldtype: "asset"`, the asset `id` from step 5.4 (links it to the Assets library) and its `filename` (the URL the frontend displays). With only the `id`, the image would not render.
- **Rich text is JSON** (`type: "doc"` with paragraph/heading/image nodes), not HTML.
- `parent_id` places it in the `destinations` folder, so `full_slug` becomes `destinations/calm-bay` — the same path as the site URL.
- `publish: true` publishes it immediately (stories are drafts by default), so it also appears in production and gets a `first_published_at`.

**Response — `201 Created`** (trimmed):

```json
{
  "story": {
    "id": 224736933121838,
    "name": "Calm Bay",
    "slug": "calm-bay",
    "full_slug": "destinations/calm-bay",
    "parent_id": 224717188581039,
    "published": true,
    "first_published_at": "2026-09-28T00:56:55.344Z",
    "content": {
      "component": "destination",
      "title": "Calm Bay",
      "cover_image": { "fieldtype": "asset", "id": 224730298933117, "filename": "https://a.storyblok.com/f/…/costa-rica.jpg" },
      "_uid": "8aa4a610-370d-40d7-8d3b-ba5bdac24afc"
    }
  }
}
```

### 5.6 Verify
- Storyblok: **Content → Destinations → Calm Bay** shows every field, the cover image and the formatted article.
- Content Delivery API: `GET https://api.storyblok.com/v2/cdn/stories/destinations/calm-bay?version=draft&token=<preview token>` returns the story.
- Website: `/destinations/calm-bay` renders the page, and the card appears on `/` and `/destinations`.

---

## 6. Run it locally

**Requirements:** Node 20+, a Storyblok space.

```bash
npm install
```

Create `.env` (never committed):

```
VITE_STORYBLOK_DELIVERY_API_TOKEN=<preview token>
VITE_STORYBLOK_VERSION=draft
```

```bash
npm run dev    # https://localhost:3000
```

The first run installs a local certificate with mkcert; accept it. Then open the `landing` story in Storyblok's Visual Editor.

---

## 7. Deployment: preview vs production

The site is deployed to **Netlify** as two sites built from the same GitHub repository. Only the environment variables differ (*Site configuration → Environment variables*):

| Variable | Preview site ([storyblokprev](https://storyblokprev.netlify.app/)) | Production site ([storyblokpublished](https://storyblokpublished.netlify.app/)) |
| --- | --- | --- |
| `VITE_STORYBLOK_DELIVERY_API_TOKEN` | **Preview** token | **Public** token |
| `VITE_STORYBLOK_VERSION` | `draft` | `published` |
| Storyblok Bridge | Loaded (live editing) | Not loaded |
| Audience | Editors in the Visual Editor | Site visitors |

- The preview URL is set as a Visual Editor location in Storyblok.
- Build settings on both sites: build command `npm run build`, publish directory `dist`.
- A Netlify redirect rule (`/*  /index.html  200`) sends every path to `index.html`, so deep links like `/destinations/calm-bay` work on reload.
- Vite reads `VITE_*` variables at **build time**, so after changing a variable in Netlify the site has to be redeployed.
- The Public token can only read published content, so even if someone changed the `version` parameter in production, drafts could not be exposed.

**How to see the difference:** edit a story and **Save** without publishing → the change appears in preview only. Click **Publish** → it appears in production too.

---

## 8. Issues found and how I solved them

A record of the problems that came up while building the project, what caused them and how they were fixed:

| Symptom | Cause | Fix |
| --- | --- | --- |
| Console: `Component page doesn't exist` | The `components` keys must be the **content type's technical name**. My home story was the demo `home` (type `page`) instead of my `landing` story (type `landing`). | Request the right slug (`useStoryblok('landing')`) and register `landing: Landing`. |
| Console: `Component teaser/grid doesn't exist` after deleting those blocks | Deleting a block from the Block Library only deletes its *definition*; instances stay in stories' content. | Remove the old blocks from the story's `body` and save. |
| `Hero is not defined` / `Property 'blok' is missing` | An old static page still rendered `<Hero />` without a `blok`. | Render pages via `StoryblokComponent`, never block components directly. |
| TypeScript: `JSX.IntrinsicElements` / implicit `any` | JS project converted to TSX without TS config. | Added `tsconfig.json` (`"jsx": "react-jsx"`), `@types/react`, and typed props with `SbBlokData`. |
| TypeScript error in `StoryblokRichText` `image` override | Hand-written type required `src: string`; the SDK allows `string \| null`. | Use the SDK type `StoryblokReactRichTextProps<'image'>` and guard `if (!attrs.src)`. |
| `…differs from file name … only in casing` | Import `./destination` vs file `Destination.tsx`. Works on Windows, breaks on the Netlify build (Linux). | Make imports match file names exactly. |
| Management API `401` with a token from the space | Used the Public (Content Delivery) token. | Use a **Personal access token**, without `Bearer`. |
| CloudFront `403 Bad request` on a `GET` | Postman request duplicated from a POST still had a body; CloudFront rejects GET with a body. | Body → *none* on GET requests. |
| S3 `403` / expired signature risk | Signed fields expire (~10 min) and must be sent unchanged, file last. | Run steps 1 and 2 back-to-back; copy fields exactly; file as the last form-data row; *No Auth*. |
| Visual Editor: `http:// is not allowed` and opened `/landing` | The Visual Editor needs HTTPS; the story slug differs from the page path. | mkcert for local HTTPS, `https://localhost:3000/` as location, **Real path** `/` on the landing story. |
| URL without a story stays on the loader | `useStoryblok` does not expose 404 errors. | Known limitation; a next step would be fetching with `useStoryblokApi()` in a `try/catch` to show a 404 page. |

---

## References

- [Integrate React with Storyblok](https://www.storyblok.com/docs/guides/react) · [Visual Preview in React](https://www.storyblok.com/docs/guides/react/visual-preview) · [Dynamic Routing in React](https://www.storyblok.com/docs/guides/react/dynamic-routing)
- [Management API introduction](https://www.storyblok.com/docs/api/management)
- [Create a component](https://www.storyblok.com/docs/api/management/components/create-a-component)
- [Create a story](https://www.storyblok.com/docs/api/management/stories/create-a-story)
- [Upload and replace assets](https://www.storyblok.com/docs/api/management/assets/upload-and-replace-assets) · [Get signed response](https://www.storyblok.com/docs/api/management/assets/get-signed-response) · [Finish upload](https://www.storyblok.com/docs/api/management/assets/finish-upload)