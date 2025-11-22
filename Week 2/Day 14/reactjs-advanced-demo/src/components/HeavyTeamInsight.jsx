export default function HeavyTeamInsight() {
  const members = Array.from({ length: 500 }, (_, index) => ({ id: index + 1, score: Math.round(Math.random() * 100) }));
  const average = members.reduce((sum, item) => sum + item.score, 0) / members.length;

  return (
    <div className="card">
      <h3>Lazy Loaded Insight</h3>
      <p>Simulates code splitting by loading this expensive chunk on demand.</p>
      <p>Average score across {members.length} pseudo members: {average.toFixed(2)}</p>
    </div>
  );
}
