import StatsBoard from './components/StatsBoard.jsx';
import ReduxCounter from './components/ReduxCounter.jsx';
import PWABadge from './components/PWABadge.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>Day 15 · Hooks, Context, Redux, PWA</h1>
        <p>Combine hooks, Context API, progressive enhancement, and Redux Toolkit.</p>
      </header>
      <StatsBoard />
      <ReduxCounter />
      <PWABadge />
    </div>
  );
}
