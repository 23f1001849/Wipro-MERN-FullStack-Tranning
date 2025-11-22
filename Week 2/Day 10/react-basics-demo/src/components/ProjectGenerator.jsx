const commands = ['npx create-react-app my-app', 'cd my-app', 'npm start'];

export default function ProjectGenerator() {
  return (
    <article className="card">
      <h3>create-react-app Recap</h3>
      <p>
        CRA bootstraps tooling (Webpack, Babel, ESLint) so beginners focus on components. Vite or Next.js are
        lighter/faster alternatives once the basics click.
      </p>
      <pre>
        <code>{commands.join('\n')}</code>
      </pre>
    </article>
  );
}
