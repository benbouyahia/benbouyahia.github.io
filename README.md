# Ayoub Ben Bouyahia | Portfolio

Personal portfolio for my Business Intelligence and Data Analyst work, built with TanStack Start, React, and TypeScript.

## Local development

Requires Node.js and npm.

```sh
npm install
npm run dev
```

## Build and test

```sh
npm run build
npm test
```

The build prerenders the portfolio routes into `.output/public` for static hosting.

## GitHub Pages

To publish at `https://benbouyahia.github.io`, the repository must be named `benbouyahia.github.io`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The workflow in `.github/workflows/deploy-pages.yml` deploys the prerendered site from the repository's default branch.

Keep the files in `public/images` committed so the portrait and dashboard images are included in the deployment.
