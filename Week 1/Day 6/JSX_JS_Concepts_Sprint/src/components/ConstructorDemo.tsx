import { useMemo } from 'react';
import { NumberItem } from '../types';

interface ConstructorDemoProps {
  values: number[];
}

class NumberCollection {
  private readonly numbers: NumberItem[];

  constructor(values: number[]) {
    this.numbers = values.map((value) => ({ value }));
  }

  get original(): number[] {
    return this.numbers.map((item) => item.value);
  }

  get doubled(): number[] {
    return this.numbers.map((item) => item.value * 2);
  }

  get even(): number[] {
    return this.numbers.filter((item) => item.value % 2 === 0).map((item) => item.value);
  }

  describe(): string {
    return `Stored ${this.numbers.length} numbers inside a class instance.`;
  }
}

const ConstructorDemo = ({ values }: ConstructorDemoProps): JSX.Element => {
  const collection = useMemo(() => new NumberCollection(values), [values]);

  return (
    <section className="card">
      <h2>Constructor Demo</h2>
      <p>{collection.describe()}</p>
      <dl className="constructor-details">
        <dt>Original Values</dt>
        <dd>{collection.original.join(', ')}</dd>
        <dt>Even Numbers</dt>
        <dd>{collection.even.join(', ') || 'None'}</dd>
        <dt>Doubled Values</dt>
        <dd>{collection.doubled.join(', ')}</dd>
      </dl>
    </section>
  );
};

export default ConstructorDemo;
