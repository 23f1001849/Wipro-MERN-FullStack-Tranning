import { FormEvent, useState } from 'react';

interface AddNumberFormProps {
  onAdd: (value: number) => void;
  onReset: () => void;
  nextExample?: () => void;
  count: number;
}

const AddNumberForm = ({ onAdd, onReset, nextExample, count }: AddNumberFormProps): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      setError('Enter a number first.');
      return;
    }

    const parsed = Number(inputValue);

    if (Number.isNaN(parsed) || !Number.isFinite(parsed)) {
      setError('That value is not a valid number.');
      return;
    }

    onAdd(parsed);
    setInputValue('');
    setError(null);
  };

  const handleExampleClick = () => {
    if (nextExample) {
      nextExample();
    }
  };

  return (
    <section className="card">
      <h2>Manage Base Numbers</h2>
      <p>Augment the dataset to immediately see how transformations react to new values.</p>
      <form className="add-number-form" onSubmit={handleSubmit}>
        <label htmlFor="new-number">Add Number</label>
        <div className="add-number-input-row">
          <input
            id="new-number"
            type="number"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="e.g. 42"
          />
          <button type="submit">Add</button>
        </div>
      </form>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="add-number-actions">
        <p className="dataset-size">Tracking {count} base values.</p>
        <div className="button-row">
          <button type="button" onClick={onReset} className="ghost-button">
            Restore Seed Values
          </button>
          {nextExample && (
            <button type="button" onClick={handleExampleClick}>
              Add Random Example
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddNumberForm;
