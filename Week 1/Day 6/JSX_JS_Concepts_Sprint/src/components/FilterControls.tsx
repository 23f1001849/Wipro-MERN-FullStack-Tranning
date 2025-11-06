interface FilterControlsProps {
  onShowAll: () => void;
  onFilterEven: () => void;
  onDoubleValues: () => void;
}

const FilterControls = ({
  onShowAll,
  onFilterEven,
  onDoubleValues,
}: FilterControlsProps): JSX.Element => (
  <section className="card controls">
    <h2>Array Method Playground</h2>
    <p>Select an operation to watch array transformations in action.</p>
    <div className="button-row">
      <button type="button" onClick={onShowAll}>
        Show All Numbers
      </button>
      <button type="button" onClick={onFilterEven}>
        Filter Even Numbers
      </button>
      <button type="button" onClick={onDoubleValues}>
        Double Each Number
      </button>
    </div>
  </section>
);

export default FilterControls;
