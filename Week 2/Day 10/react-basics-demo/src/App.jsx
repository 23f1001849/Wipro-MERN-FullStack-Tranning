import FunctionalWelcome from './components/FunctionalWelcome.jsx';
import ClassCounter from './components/ClassCounter.jsx';
import StatefulForm from './components/StatefulForm.jsx';
import RefsShowcase from './components/RefsShowcase.jsx';
import ProjectGenerator from './components/ProjectGenerator.jsx';

const topics = [
  'Virtual DOM keeps a lightweight UI tree in memory and syncs real DOM patches.',
  'JSX is syntactic sugar over React.createElement and compiles during build time.',
  'Components describe UI in small reusable units and receive props for configuration.',
  'Stateful widgets rerender declaratively whenever setState/useState updates data.',
];

export default function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>Day 10 · React Basics</h1>
        <p>Overview, component types, props, events, state, controlled inputs, and refs.</p>
      </header>

      <section>
        <h2>1. React Overview</h2>
        <ul>
          {topics.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        <ProjectGenerator />
      </section>

      <section>
        <h2>2. Components, Props, Event Handling</h2>
        <FunctionalWelcome name="Harshal" onWave={() => alert('Event bubbling from Functional Component!')} />
      </section>

      <section>
        <h2>3. Class Components & Controlled State</h2>
        <ClassCounter />
        <StatefulForm />
      </section>

      <section>
        <h2>4. Using Refs (Uncontrolled Inputs)</h2>
        <RefsShowcase />
      </section>
    </div>
  );
}
