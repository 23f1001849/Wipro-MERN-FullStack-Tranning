import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../store/index.js';

export default function ReduxCounter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <article className="card">
      <h3>Redux Toolkit Slice</h3>
      <div className="counter-row">
        <button type="button" onClick={() => dispatch(decrement())}>
          -
        </button>
        <span>{value}</span>
        <button type="button" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
      <p>Demonstrates state management akin to Redux/ngrx/ngrx-effects.</p>
    </article>
  );
}
