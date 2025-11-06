import { useState } from 'react';
import FilterControls from './components/FilterControls';
import NumberList from './components/NumberList';
import Logger from './components/Logger';
import HoistingDemo from './components/HoistingDemo';
import ConstructorDemo from './components/ConstructorDemo';
import { NumberItem } from './types';
import './App.css';

const seedValues = [4, 7, 12, 15, 18, 21, 26, 30];

const mapToItems = (values: number[]): NumberItem[] => values.map((value) => ({ value }));

const App = (): JSX.Element => {
  const [items, setItems] = useState<NumberItem[]>(() => mapToItems(seedValues));

  const handleShowAll = () => setItems(mapToItems(seedValues));

  const handleFilterEven = () => {
    setItems(mapToItems(seedValues.filter((value) => value % 2 === 0)));
  };

  const handleDoubleValues = () => {
    setItems(mapToItems(seedValues.map((value) => value * 2)));
  };

  return (
    <main className="app">
      <header className="hero">
        <h1>JSX &amp; JavaScript Concepts Sprint</h1>
        <p>
          Explore array methods, hoisting, and constructors through an interactive React
          experience.
        </p>
      </header>

      <FilterControls
        onShowAll={handleShowAll}
        onFilterEven={handleFilterEven}
        onDoubleValues={handleDoubleValues}
      />

      <section className="content">
        <NumberList items={items} />
        <Logger items={items} />
      </section>

      <section className="content">
        <HoistingDemo />
        <ConstructorDemo values={seedValues} />
      </section>
    </main>
  );
};

export default App;
