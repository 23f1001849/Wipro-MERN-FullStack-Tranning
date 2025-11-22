import { useState, useSyncExternalStore } from 'react';
import { DependencyProvider, useDependencies } from './DependencyContext.jsx';
import { addTask, toggleTask } from './flux/actions.js';
import { subscribe, getSnapshot } from './flux/store.js';

export default function App() {
  return (
    <DependencyProvider>
      <Shell />
    </DependencyProvider>
  );
}

function Shell() {
  const tasks = useSyncExternalStore(subscribe, getSnapshot);
  const { notificationService } = useDependencies();
  const [title, setTitle] = useState('');

  const submit = (event) => {
    event.preventDefault();
    addTask(title);
    notificationService.notify(`Task created: ${title}`);
    setTitle('');
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Day 13 · Flux Pattern & SPA building blocks</h1>
        <p>Dispatcher → Action → Store → View cycle keeps data flow predictable.</p>
      </header>

      <section>
        <h2>Flux Task Board</h2>
        <form onSubmit={submit} className="task-form">
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add work item" />
          <button type="submit">Add</button>
        </form>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                <span className={task.done ? 'done' : ''}>{task.title}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>SPA Building Blocks</h2>
        <ol>
          <li>Routing layer decides which view tree to render.</li>
          <li>State management (Flux/Redux/Signals) stores domain data.</li>
          <li>Data fetching (REST/GraphQL) hydrates stores.</li>
          <li>Dependency injection decouples infrastructure from React trees.</li>
        </ol>
      </section>
    </div>
  );
}
