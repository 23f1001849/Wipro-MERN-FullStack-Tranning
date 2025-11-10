import { useMemo } from 'react';

interface StatsPanelProps {
  values: number[];
}

interface ComputedStats {
  count: number;
  sum: number;
  average: number;
  median: number;
  min: number;
  max: number;
  even: number;
  odd: number;
}

const formatNumber = (value: number): string =>
  Number.isInteger(value) ? value.toString() : value.toFixed(2);

const StatsPanel = ({ values }: StatsPanelProps): JSX.Element => {
  const stats = useMemo<ComputedStats | null>(() => {
    if (!values.length) {
      return null;
    }

    const sorted = [...values].sort((a, b) => a - b);
    const sum = values.reduce((total, value) => total + value, 0);
    const even = values.filter((value) => value % 2 === 0).length;
    const odd = values.length - even;
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];

    return {
      count: values.length,
      sum,
      average: sum / values.length,
      median,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      even,
      odd,
    };
  }, [values]);

  return (
    <section className="card">
      <h2>Array Stats</h2>
      <p>
        Computed via <code>Array.reduce</code>, <code>Array.filter</code>, and <code>Array.sort</code> to
        reinforce how derived data flows through React.
      </p>
      {!stats ? (
        <p className="muted">Add numbers to reveal statistics.</p>
      ) : (
        <dl className="stats-grid">
          <div>
            <dt>Total Items</dt>
            <dd>{stats.count}</dd>
          </div>
          <div>
            <dt>Sum</dt>
            <dd>{formatNumber(stats.sum)}</dd>
          </div>
          <div>
            <dt>Average</dt>
            <dd>{formatNumber(stats.average)}</dd>
          </div>
          <div>
            <dt>Median</dt>
            <dd>{formatNumber(stats.median)}</dd>
          </div>
          <div>
            <dt>Minimum</dt>
            <dd>{formatNumber(stats.min)}</dd>
          </div>
          <div>
            <dt>Maximum</dt>
            <dd>{formatNumber(stats.max)}</dd>
          </div>
          <div>
            <dt>Even Count</dt>
            <dd>{stats.even}</dd>
          </div>
          <div>
            <dt>Odd Count</dt>
            <dd>{stats.odd}</dd>
          </div>
        </dl>
      )}
    </section>
  );
};

export default StatsPanel;
