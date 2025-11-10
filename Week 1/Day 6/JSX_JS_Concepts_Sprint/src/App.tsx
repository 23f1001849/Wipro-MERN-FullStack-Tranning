import { useCallback, useMemo, useState } from 'react';
import FilterControls, { FilterOperation } from './components/FilterControls';
import NumberList from './components/NumberList';
import Logger from './components/Logger';
import HoistingDemo from './components/HoistingDemo';
import ConstructorDemo from './components/ConstructorDemo';
import AddNumberForm from './components/AddNumberForm';
import StatsPanel from './components/StatsPanel';
import TransformationHistory from './components/TransformationHistory';
import { NumberItem } from './types';
import './App.css';

const seedValues = [4, 7, 12, 15, 18, 21, 26, 30];

const mapToItems = (values: number[]): NumberItem[] => values.map((value) => ({ value }));

const App = (): JSX.Element => {
  const [baseValues, setBaseValues] = useState<number[]>(seedValues);
  const [items, setItems] = useState<NumberItem[]>(() => mapToItems(seedValues));
  const [history, setHistory] = useState<string[]>([]);

  const appendHistory = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    setHistory((previous) => [`${timestamp} – ${message}`, ...previous]);
  }, []);

  const updateItems = useCallback((values: number[], description: string) => {
    setItems(mapToItems(values));
    appendHistory(description);
  }, [appendHistory]);

  const addNumber = useCallback(
    (value: number, source: 'form' | 'example' = 'form') => {
      setBaseValues((previous) => {
        const next = [...previous, value];
        updateItems(next, source === 'form'
          ? `Added ${value} via controlled input.`
          : `Appended ${value} from Math.random() example.`);
        return next;
      });
    },
    [updateItems],
  );

  const handleAddFromForm = useCallback(
    (value: number) => {
      addNumber(value, 'form');
    },
    [addNumber],
  );

  const handleAddExample = useCallback(() => {
    const candidate = Math.floor(Math.random() * 60) + 1;
    addNumber(candidate, 'example');
  }, [addNumber]);

  const handleResetSeed = useCallback(() => {
    setBaseValues(seedValues);
    updateItems(seedValues, 'Restored seed dataset.');
  }, [updateItems]);

  const operations = useMemo<FilterOperation[]>(() => {
    const baseCopy = [...baseValues];

    return [
      {
        id: 'show-all',
        label: 'Show All Numbers',
        description: 'Use Array.map to render the dataset without transformations.',
        onSelect: () => updateItems(baseCopy, 'Viewed full dataset (Array.map).'),
      },
      {
        id: 'filter-even',
        label: 'Filter Even',
        description: 'Apply Array.filter to isolate even numbers.',
        onSelect: () =>
          updateItems(
            baseCopy.filter((value) => value % 2 === 0),
            'Filtered even numbers (Array.filter).',
          ),
      },
      {
        id: 'filter-odd',
        label: 'Filter Odd',
        description: 'Complement the even filter by targeting odd values.',
        onSelect: () =>
          updateItems(
            baseCopy.filter((value) => value % 2 !== 0),
            'Filtered odd numbers (Array.filter).',
          ),
      },
      {
        id: 'double-values',
        label: 'Double Values',
        description: 'Demonstrate Array.map by doubling every entry.',
        onSelect: () =>
          updateItems(
            baseCopy.map((value) => value * 2),
            'Doubled every value (Array.map).',
          ),
      },
      {
        id: 'unique-sorted',
        label: 'Unique & Sorted',
        description: 'Combine Set + Array.from + sort for a clean ascending list.',
        onSelect: () =>
          updateItems(
            Array.from(new Set(baseCopy)).sort((a, b) => a - b),
            'Generated unique sorted values (Set + Array.sort).',
          ),
      },
      {
        id: 'slice-middle',
        label: 'Slice Middle 3',
        description: 'Use Array.slice to focus on the center of the dataset.',
        onSelect: () => {
          if (baseCopy.length <= 3) {
            updateItems(baseCopy, 'Dataset small, showing all values.');
            return;
          }

          const middleStart = Math.floor((baseCopy.length - 3) / 2);
          updateItems(
            baseCopy.slice(middleStart, middleStart + 3),
            'Sliced middle trio (Array.slice).',
          );
        },
      },
    ];
  }, [baseValues, updateItems]);

  const displayedValues = useMemo(() => items.map((item) => item.value), [items]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <main className="app">
      <header className="hero">
        <h1>JSX &amp; JavaScript Concepts Sprint</h1>
        <p>
          Explore array methods, hoisting, and constructors through an interactive React
          experience.
        </p>
        <p>
          Explore array methods, hoisting, and constructors through an interactive React
          experience. Extend the dataset and observe how derived state updates in real-time.
        </p>
      </header>

      <AddNumberForm
        onAdd={handleAddFromForm}
        onReset={handleResetSeed}
        nextExample={handleAddExample}
        count={baseValues.length}
      />

      <FilterControls operations={operations} />

      <section className="content">
        <NumberList items={items} />
        <StatsPanel values={displayedValues} />
      </section>

      <section className="content">
        <Logger items={items} />
        <TransformationHistory history={history} onClear={handleClearHistory} />
      </section>

      <section className="content">
        <HoistingDemo />
        <ConstructorDemo values={baseValues} />
      </section>
    </main>
  );
};

export default App;
