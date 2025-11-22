import { useState } from 'react';

export default function StatefulForm() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('React');

  return (
    <article className="card">
      <h3>Controlled Form</h3>
      <form className="stacked">
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Favorite Library
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option>React</option>
            <option>Vue</option>
            <option>Svelte</option>
          </select>
        </label>
        <output>
          Preview: {name || 'Anonymous'} loves {language}
        </output>
      </form>
    </article>
  );
}
