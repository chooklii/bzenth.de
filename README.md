# bzenth.de

My personal website – built with React and Webpack, hosted as a static site via GitHub Pages.

## Tech Stack

- **React 16** with React Router for client-side routing
- **Webpack 4** as bundler (incl. Babel, CSS extraction & minification)
- **Phaser 3** for the embedded arcade game
- **Ant Design** as UI library
- **Font Awesome** for icons
- **i18n** – custom translation solution (DE/EN) via React Context

## Architecture

The project has **two independent entry points**, bundled separately by Webpack:

1. **`bundle`** (`src/Classic/index.js`) – The main website with all subpages and the blog.
2. **`arcade`** (`src/Game/index.js`) – A Phaser 3 platformer game at `/arcade`, fully self-contained.

### Routing & Pages

Routing is handled by React Router. Webpack generates a separate `index.html` for each route (`/projekte`, `/skills`, `/kontakt`, `/impressum`, `/blog`, …), each loading the `bundle` script. This ensures direct URL access works on GitHub Pages.

### Translations

DE and EN texts are provided as JSON files in `src/translations/`. The `LanguageSwitch` component toggles the language via React Context.

### Deployment

The build output goes into `docs/`, from where GitHub Pages serves the site. The CNAME points to `bzenth.de`.

## Development

```bash
npm install        # Install dependencies
npm start          # Dev server on port 9000
npm run build      # Production build to docs/
