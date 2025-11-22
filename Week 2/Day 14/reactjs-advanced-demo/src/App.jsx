import { lazy, Suspense, useState } from 'react';
import PureCounter from './components/PureCounter.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import PortalBanner from './components/PortalBanner.jsx';

const HeavyTeamInsight = lazy(() => import('./components/HeavyTeamInsight.jsx'));
const AnalyticsPanel = lazy(() => import('./components/AnalyticsPanel.jsx'));

export default function App() {
  const [showLazy, setShowLazy] = useState(false);
  const [explode, setExplode] = useState(false);

  return (
    <div className="app-shell">
      <header>
        <h1>Day 14 · ReactJS Advanced Topics</h1>
        <p>Lazy Loading, Code Splitting, Pure Components, Error Boundaries, Portals.</p>
      </header>
      <PortalBanner />

      <section>
        <h2>Code Splitting & Lazy Loading</h2>
        <button type="button" onClick={() => setShowLazy((value) => !value)}>
          {showLazy ? 'Hide' : 'Show'} lazy chunks
        </button>
        {showLazy && (
          <ErrorBoundary>
            <Suspense fallback={<p>Loading heavy insight…</p>}>
              {explode ? <Problematic /> : <HeavyTeamInsight />}
              <AnalyticsPanel />
            </Suspense>
          </ErrorBoundary>
        )}
        <button type="button" onClick={() => setExplode(true)}>
          Trigger error inside lazy chunk
        </button>
      </section>

      <section>
        <h2>Pure Components</h2>
        <PureCounter />
      </section>
    </div>
  );
}

function Problematic() {
  throw new Error('lazy chunk crashed');
}
