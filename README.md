# [Function Plotter](https://plotter.fanglin.me/) &middot; [![CI / Release / Deploy](https://github.com/fang-lin/function-plotter/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/fang-lin/function-plotter/actions/workflows/build-and-deploy.yml)

An interactive mathematical function plotter built with React and TypeScript. Supports standard functions (y = f(x)) and parametric equations (x = f(t), y = g(t)), rendered on HTML5 Canvas with Web Workers for off-thread computation.

**Live:** https://plotter.fanglin.me/

## Features

- Plot standard functions and parametric equations
- Interactive canvas with drag-to-pan and zoom
- Cross-cursor tracking with coordinate display
- Equation management with color coding
- Shareable URLs encoding the full plot state
- 10 built-in example curves (butterfly curve, rose curve, Lissajous, etc.)

## Tech Stack

- **React 18** with function components and hooks
- **TypeScript 5**
- **Vite 6** for build and dev server
- **React Router 7** with BrowserRouter
- **Styled Components** for CSS-in-JS
- **Web Workers** for parallel equation computation
- **math.js** for expression parsing and evaluation
- **Vitest** for unit testing

## Development

```bash
npm install
npm run dev
```

## Scripts

| Command                  | Description                         |
| ------------------------ | ----------------------------------- |
| `npm run dev`            | Start dev server                    |
| `npm run build`          | Type-check and build for production |
| `npm run preview`        | Preview production build locally    |
| `npm run lint`           | Run ESLint                          |
| `npm run prettier`       | Format code with Prettier           |
| `npm run prettier:check` | Check code formatting               |
| `npm test`               | Run unit tests                      |
| `npm run test:watch`     | Run tests in watch mode             |

## CI/CD

Automated via GitHub Actions:

1. **CI** - lint, prettier check, unit tests, npm audit
2. **Release** - semantic-release (version bump, changelog, GitHub release)
3. **Deploy** - build and deploy to Vercel

PR submissions trigger preview deployments with version-tagged URLs.

## License

MIT
