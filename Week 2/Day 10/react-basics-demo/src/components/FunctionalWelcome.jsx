export default function FunctionalWelcome({ name, onWave }) {
  return (
    <article className="card">
      <h3>Functional Component</h3>
      <p>
        Hello <strong>{name}</strong>, this component uses props and inline event handlers.
      </p>
      <button type="button" onClick={onWave}>
        Wave 👋
      </button>
    </article>
  );
}
