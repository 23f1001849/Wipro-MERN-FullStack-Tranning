import { useState } from 'react';

export default function TransitionPage() {
  const [step, setStep] = useState('enter');

  return (
    <article>
      <h2>Routing Transition Concepts</h2>
      <p>Transitions can be implemented with suspense, CSS transitions, or libraries like Framer Motion.</p>
      <div className={`transition-panel transition-${step}`}>
        Current transition phase: {step}
      </div>
      <div className="button-row">
        {['enter', 'active', 'exit'].map((phase) => (
          <button key={phase} type="button" onClick={() => setStep(phase)}>
            {phase}
          </button>
        ))}
      </div>
    </article>
  );
}
