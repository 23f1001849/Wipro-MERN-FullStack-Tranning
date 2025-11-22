import { useRef } from 'react';

export default function RefsShowcase() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <article className="card">
      <h3>Refs for Uncontrolled Input</h3>
      <p>Refs jump around the DOM without storing value in React state.</p>
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <button type="button" onClick={focusInput}>
        Focus input
      </button>
    </article>
  );
}
