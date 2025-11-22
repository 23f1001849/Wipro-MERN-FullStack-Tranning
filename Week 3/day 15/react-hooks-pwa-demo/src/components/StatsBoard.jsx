import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../ThemeProvider.jsx';
import { useOnlineStatus } from '../hooks.js';

export default function StatsBoard() {
  const { mode, toggle } = useTheme();
  const online = useOnlineStatus();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const insight = useMemo(() => (seconds % 2 === 0 ? 'Even cadence helps batching renders.' : 'Odd tick triggers recalculation.'), [seconds]);

  return (
    <article className={`card card-${mode}`}>
      <h3>React Hooks Dashboard</h3>
      <p>Seconds since mount: {seconds}</p>
      <p>App is currently {online ? 'online ✅' : 'offline 🚨'}</p>
      <p>{insight}</p>
      <button type="button" onClick={toggle}>
        Toggle Theme ({mode})
      </button>
    </article>
  );
}
