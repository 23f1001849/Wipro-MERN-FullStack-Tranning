interface TransformationHistoryProps {
  history: string[];
  onClear: () => void;
}

const TransformationHistory = ({ history, onClear }: TransformationHistoryProps): JSX.Element => (
  <section className="card">
    <h2>Transformation History</h2>
    <p>Every button interaction appends a description so you can trace the data pipeline.</p>
    {history.length === 0 ? (
      <p className="muted">Make a selection to build the log.</p>
    ) : (
      <ol className="history-list">
        {history.map((entry, index) => (
          <li key={`${entry}-${index}`}>{entry}</li>
        ))}
      </ol>
    )}
    <button type="button" onClick={onClear} className="ghost-button">
      Clear History
    </button>
  </section>
);

export default TransformationHistory;
