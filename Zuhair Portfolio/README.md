# Zuhair Portfolio

This repository contains a personal portfolio website for Muhammad Zuhair Zeb.
The main app lives in `artifacts/portfolio` and is built with Vite, React, TypeScript, Tailwind CSS, and animation libraries.

## Website Overview

The portfolio is a modern single-page site with a cyber-tech visual style and the following sections:

- `Home` / Hero: animated particle background, custom cursor, rotating role text, and 3D-style visual effects.
- `About`: personal summary, current status, achievements, and language proficiency.
- `Skills`: interactive skill bars for Power BI, Excel, Python, SQL, Pandas, NumPy, Matplotlib, Seaborn, and Linux.
- `Projects`: featured deployed modules with animated cards and hover interactions.
- `Experience`: timeline of internships, volunteer work, community leadership, and founding Sociapi Society.
- `Education`: current AI undergraduate degree and academic focus.
- `Awards`: recognition such as volunteer awards, event organization, and analytics contributor award.
- `Certificates`: verified credentials from organisations like UNICEF, Google, Elevvo Pathways, Digital Empowerment Network, and University of Pennsylvania.
- `Contact`: a contact panel with email, phone, LinkedIn, and CV download link.
- `Footer`: branded identity and system status.

The site includes:

- smooth scrolling powered by `@studio-freight/lenis`
- motion and entrance animations with `framer-motion`
- theme toggle with local storage persistence
- responsive mobile navigation with drawer support
- custom cursor and hover effects
- `mailto:` contact form integration

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Wouter routing
- TanStack React Query
- Three.js
- GSAP
- Radix UI
- Tailwind CSS Vite plugin

## Project Structure

- `/artifacts/portfolio`
  - `package.json` - app dependencies and scripts
  - `vite.config.ts` - Vite configuration
  - `src/` - source code for the portfolio app
  - `src/components/` - page sections and UI components
  - `src/pages/Home.tsx` - main page rendering sequence
  - `src/App.tsx` - app router and providers
- `/lib` - shared local library code
- `netlify.toml` - deployment configuration
- `package.json` - root workspace file

## Setup

Install the portfolio app dependencies:

```powershell
cd "d:\WebDev-Projects\WebDev-Projects\Zuhair Portfolio\artifacts\portfolio"
npm install
```

If you need root-level packages, install them from the workspace root:

```powershell
cd "d:\WebDev-Projects\WebDev-Projects\Zuhair Portfolio"
npm install
```

## Run Locally

Start the portfolio development server:

```powershell
cd "d:\WebDev-Projects\WebDev-Projects\Zuhair Portfolio\artifacts\portfolio"
npm run dev
```

By default, the site uses `PORT=5173` when no `PORT` environment variable is set.

## Build

Build the portfolio app for production:

```powershell
cd "d:\WebDev-Projects\WebDev-Projects\Zuhair Portfolio\artifacts\portfolio"
npm run build
```

The production output is generated under `artifacts/portfolio/dist/public`.

## Notes

- The site uses a local theme state saved to `localStorage` under `portfolio-theme`.
- The contact form sends messages using a `mailto:` link to `zebzuhair71@gmail.com`.
- The navigation includes smooth scrolling and section highlight tracking.
- The `vite.config.ts` file supports `BASE_PATH` and `PORT` environment variables.
