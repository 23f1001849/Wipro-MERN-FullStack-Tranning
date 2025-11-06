import { NumberItem } from '../types';

interface LoggerProps {
  items: NumberItem[];
}

const Logger = ({ items }: LoggerProps): JSX.Element => {
  const handleLog = () => {
    console.group('Number Logger');
    items.forEach((item, index) => {
      console.log(`Index ${index}: ${item.value}`);
    });
    console.groupEnd();
  };

  return (
    <section className="card">
      <h2>Logger</h2>
      <p>
        Click below to iterate with <code>Array.forEach</code> and log each number to the console.
      </p>
      <button type="button" onClick={handleLog}>
        Log Numbers to Console
      </button>
    </section>
  );
};

export default Logger;
