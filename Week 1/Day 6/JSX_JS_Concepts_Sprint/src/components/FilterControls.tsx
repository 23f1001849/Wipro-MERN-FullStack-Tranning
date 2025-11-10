export interface FilterOperation {
  id: string;
  label: string;
  description: string;
  onSelect: () => void;
}

interface FilterControlsProps {
  operations?: FilterOperation[];
}

const FilterControls = ({ operations = [] }: FilterControlsProps): JSX.Element => (
  <section className="card controls">
    <h2>Array Method Playground</h2>
    <p>
      Each button demonstrates a different array helper while keeping React renders predictable and
      easy to trace.
    </p>
    <div className="control-grid" role="list">
      {operations.map(({ id, label, description, onSelect }) => (
        <div key={id} className="control-option" role="listitem">
          <button type="button" onClick={onSelect}>
            {label}
          </button>
          <p className="muted">{description}</p>
        </div>
      ))}
      {operations.length === 0 && <p className="muted">Operations unavailable.</p>}
    </div>
  </section>
);

export default FilterControls;
