import withHighlight from './withHighlight.jsx';

function CourseCard({ title, level }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Level: {level}</p>
    </div>
  );
}

const HighlightedCourse = withHighlight(CourseCard);

export default function HOCShowcase() {
  return (
    <article>
      <h2>Higher Order Components</h2>
      <p>HOCs wrap components to inject props/behavior (e.g., analytics, theming, feature flags).</p>
      <HighlightedCourse title="Render Props" level="Intermediate" />
    </article>
  );
}
