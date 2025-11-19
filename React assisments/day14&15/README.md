# BookVerse · Day 14 → 15 Showcase

Standalone React application that now highlights both the original Day 14 deep-dive **and** the Day 15 hooks/state challenges:

- Lazy loaded curriculum modules
- Pure `React.memo` statistics widgets
- Resilient error boundary paired with a failure toggle
- Portal-powered modal overlay with keyboard/backdrop dismissal
- ThemeContext-powered light/dark mode (persisted in `localStorage`)
- Workout Tracker using `useState`, `useEffect`, `useRef`, and a custom `useTimer` hook
- Redux Toolkit product admin panel with async thunks (`fetchProducts`, `updateProduct`)
- Full Progressive Web App setup (service worker, manifest, install prompt, offline banner)

## Quick start

```bash
npm install
npm start
```

The app boots on http://localhost:3001 (set via `.env`) and loads the advanced showcase directly at `/`.

### Feature callouts

- **Theme toggle** — use either switch (hero or Challenge 5 card) to flip palettes globally; components consume `ThemeContext` via `useContext`.
- **Workout Tracker** — tracks sets + rest countdown with cleanup to prevent memory leaks, plus auto-reset logic once you finish a block.
- **PWA/offline** — `service-worker.js` precaches the bundle, `OfflineBanner` surfaces connectivity drops, and `PwaInstallPrompt` exposes the `beforeinstallprompt` flow.
- **Redux Toolkit** — the Product Control Panel uses `configureStore`, `createSlice`, `createAsyncThunk`, `useSelector`, and `useDispatch` to orchestrate global product data.

### Install the PWA

1. Run `npm run build` to generate the Workbox-powered service worker assets.
2. Serve the `build/` directory (`npm install -g serve && serve -s build`).
3. Open the hosted app, click **Install app** (or use your browser menu), then go offline — the interface and offline banner keep working thanks to the cache.

## Folder layout

```
day14/
  public/index.html   # includes modal root
  src/
    components/       # StatsCard, ErrorBoundary, ProductCard, PortalModal, ThemeToggle, WorkoutTracker, etc.
    context/          # ThemeContext provider + hook
    hooks/            # useTimer + useOnlineStatus helpers
    pages/            # AdvancedConceptsPage styles + component
    store/            # Redux Toolkit slice + store bootstrap
    App.js            # App shell, ThemeProvider, OfflineBanner
    service-worker.js # Workbox config (auto-built via react-scripts)
```

Each component mirrors the implementation used in the main BookVerse app so you can demo Day 14 features in isolation.
