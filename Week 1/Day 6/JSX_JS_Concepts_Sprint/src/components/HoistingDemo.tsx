import { useMemo } from 'react';

interface HoistingExample {
  title: string;
  description: string;
}

const HoistingDemo = (): JSX.Element => {
  const examples = useMemo<HoistingExample[]>(() => {
    const records: HoistingExample[] = [];

    records.push({
      title: 'Function Declarations',
      description: demonstrateFunctionHoisting(),
    });

    records.push({
      title: 'var Hoisting',
      description: demonstrateVarHoisting(),
    });

    records.push({
      title: 'Temporal Dead Zone',
      description: demonstrateTemporalDeadZone(),
    });

    return records;
  }, []);

  return (
    <section className="card">
      <h2>Hoisting Demo</h2>
      <p>Inspect how JavaScript hoists functions and variables.</p>
      <ul className="hoisting-list">
        {examples.map((example: HoistingExample) => (
          <li key={example.title}>
            <strong>{example.title}:</strong> {example.description}
          </li>
        ))}
      </ul>
    </section>
  );
};

function demonstrateFunctionHoisting(): string {
  return callBeforeDeclaration();

  function callBeforeDeclaration(): string {
    return 'Function declarations are hoisted, allowing calls before their definition.';
  }
}

function demonstrateVarHoisting(): string {
  // eslint-disable-next-line no-var
  var message;
  const beforeAssignment =
    typeof message === 'undefined'
      ? 'Variables declared with var start as undefined due to hoisting.'
      : `Unexpected value ${String(message)}`;

  message = 'Assigned after the initial check';

  return `${beforeAssignment} After assignment we see: "${message}".`;
}

function demonstrateTemporalDeadZone(): string {
  try {
    (function () {
      // @ts-ignore - intentionally access before declaration to trigger runtime error
      console.log(blockScoped);
      let blockScoped = 42; // eslint-disable-line @typescript-eslint/no-unused-vars
    })();
    return 'This line is not expected because accessing let before declaration should throw.';
  } catch (error) {
    return `Accessing let/const before declaration throws: ${(error as Error).message}`;
  }
}

export default HoistingDemo;
