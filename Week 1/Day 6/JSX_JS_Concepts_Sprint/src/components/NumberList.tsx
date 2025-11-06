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
    <ul className="number-list">
      {items.map((item, index) => (
        <li key={`${item.value}-${index}`}>{item.value}</li>
      ))}
    </ul>
  </section>
);

export default NumberList;
