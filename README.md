# Projectory

Marketing and interactive-activity website for [projectory.live](https://projectory.live).
A React single-page app built with Vite and TypeScript, deployed on Vercel with a
handful of serverless form handlers backed by Google Apps Script + Google Sheets.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [React 18](https://react.dev/) (SPA) |
| Language | [TypeScript](https://www.typescriptlang.org/) 5.6 |
| Build tool | [Vite 6](https://vite.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) (client-side, code-split routes) |
| Animation | [Framer Motion](https://www.framer.com/motion/), [react-fast-marquee](https://www.react-fast-marquee.com/) |
| Carousels | [Embla Carousel](https://www.embla-carousel.com/) |
| Data viz | [D3](https://d3js.org/) (Laser Focus scatterplot activity) |
| Media/CDN | [Cloudinary](https://cloudinary.com/) (`@cloudinary/url-gen`) |
| Icons | [react-icons](https://react-icons.github.io/react-icons/) |
| Scroll/visibility | [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) |
| Serverless API | Vercel Functions (`@vercel/node`, `api/*.cjs`) |
| Form backends | Google Apps Script + Google Sheets, email via `nodemailer` / `googleapis` |
| Linting/format | ESLint 9 (flat config) + Prettier |
| Hosting | [Vercel](https://vercel.com/) |

Node.js 18+ is recommended for local development.

## Getting started

```bash
# install dependencies
npm install

# start the dev server (Vite, http://localhost:5173)
npm run dev
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR. |
| `npm run build` | Type-checked production build to `docs/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint over `.js/.ts/.jsx/.tsx`. |
| `npm run seed:combo-convo` | Seed/restore Combo Convo backup data (`scripts/`). |

> The build output directory is `docs/` (configured in both `vite.config.ts` and
> `vercel.json`). `postbuild` copies `index.html` to `404.html` so client-side
> routes resolve on static hosts.

## Project structure

```
.
├── api/                        # Vercel serverless functions (form handlers)
│   ├── combo-convo-form.cjs
│   ├── laser-focus-form.cjs
│   └── venting-machine-form.cjs
├── apps-script-laser-focus/    # Google Apps Script source for the Laser Focus sheet
├── apps-script-venting-machine/# Google Apps Script source for the Venting Machine sheet
├── public/                     # Static assets served as-is (images, videos)
├── scripts/                    # One-off maintenance scripts (data seeding)
├── src/
│   ├── App.tsx                 # Router + route definitions (lazy-loaded pages)
│   ├── main.tsx                # App entry / React root
│   ├── assets/                 # Bundled fonts, images, documents
│   ├── components/             # Reusable UI (Navbar, Footer, carousels, CTAs, forms…)
│   ├── context/                # React context (LikedProductsContext)
│   ├── pages/                  # Route-level pages
│   │   ├── Home/
│   │   ├── WhoWeAre/
│   │   ├── Products/ ProductPages/
│   │   ├── CaseStudies/ CaseStudyPages/
│   │   ├── GetStarted/ GetStartedForm/ GetEstimatePage/
│   │   └── activities/         # Interactive event activities (Combo Convo, Laser Focus, Venting Machine)
│   ├── styles/                 # Global CSS
│   └── utils/                  # Cloudinary helpers
├── index.html
├── vite.config.ts              # Vite config: build to docs/, dev API proxy, manual chunks, critical CSS/font inlining
├── vercel.json                 # Vercel builds, host-based redirects, SPA rewrites
├── eslint.config.js
└── tsconfig*.json
```

### Routes

Defined in `src/App.tsx`. `Home` loads eagerly; all other pages are lazy-loaded and
code-split. Key routes include `/`, `/who-we-are`, `/products`, `/products/:id`,
`/case-studies`, `/case-study/:id`, `/get-started`, `/get-estimate`, and the
interactive activities `/comboconvo`, `/laserfocus`, `/laserfocus/scatterplot`, and
`/ventingmachine`.

### API & form handling

Activity forms POST to serverless functions in `api/*.cjs`, which proxy to Google
Apps Script web apps that read/write Google Sheets. In development, `vite.config.ts`
proxies `/api/*` directly to the corresponding Apps Script URLs so forms work
without running the serverless layer. The `apps-script-*/` folders hold the source
for those Google Apps Script projects.

## Deployment

Deployed on Vercel. Two branches map to two environments:

| Branch | Environment | URL |
| --- | --- | --- |
| `main` | Production | [projectory.live](https://projectory.live) |
| `staging` | Client preview | [staging.projectory.live](https://staging.projectory.live) |

New frontend changes go to `staging` first for client review, then get promoted to
`main` via merge. Host-based redirects in `vercel.json` (e.g. `/comboconvo`,
`/laserfocus`) only fire on the production `projectory.live` host.
