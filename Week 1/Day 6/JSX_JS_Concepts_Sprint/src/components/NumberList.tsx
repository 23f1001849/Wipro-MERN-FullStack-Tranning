import { NumberItem } from '../types';

interface NumberListProps {
  items: NumberItem[];
}

const NumberList = ({ items }: NumberListProps): JSX.Element => (
  <section className="card">
    <h2>Number List</h2>
    <p>
      Rendering below uses <code>Array.map</code> to create list items.
    </p>
    {items.length === 0 ? (
      <p className="muted">No values to display. Try another transformation or add numbers.</p>
    ) : (
      <ul className="number-list">
        {items.map((item, index) => (
          <li
            key={`${item.value}-${index}`}
            className={item.value % 2 === 0 ? 'number-chip is-even' : 'number-chip is-odd'}
          >
            <span className="number-chip__value">{item.value}</span>
            <span className="number-chip__meta">{item.value % 2 === 0 ? 'Even' : 'Odd'}</span>
          </li>
        ))}
      </ul>
    )}
  </section>
);

export default NumberList;
