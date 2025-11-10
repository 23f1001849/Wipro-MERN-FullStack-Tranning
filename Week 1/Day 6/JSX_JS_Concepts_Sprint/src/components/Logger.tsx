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

    const total = items.reduce((sum, item) => sum + item.value, 0);
    const allPositive = items.every((item) => item.value > 0);
    const anyAboveTwenty = items.some((item) => item.value > 20);

    console.info(`Sum via reduce: ${total}`);
    console.info(`All numbers are positive (every): ${allPositive}`);
    console.info(`Any number above 20 (some): ${anyAboveTwenty}`);
    console.groupEnd();
  };

  return (
    <section className="card">
      <h2>Logger</h2>
      <p>
        Click below to iterate with <code>Array.forEach</code>, <code>Array.reduce</code>,{' '}
        <code>Array.every</code>, and <code>Array.some</code> while logging rich insights to the console.
      </p>
      <button type="button" onClick={handleLog}>
        Log Numbers to Console
      </button>
    </section>
  );
};

export default Logger;
