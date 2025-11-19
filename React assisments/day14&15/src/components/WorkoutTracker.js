import React, { useEffect, useMemo, useRef, useState } from 'react';
import useTimer from '../hooks/useTimer';
import { useTheme } from '../context/ThemeContext';

const DEFAULT_SETS = 4;
const REST_WINDOW = 45;

const formatSeconds = (value) => {
  const minutes = Math.floor(value / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const WorkoutTracker = () => {
  const [currentSet, setCurrentSet] = useState(1);
  const [goalSets, setGoalSets] = useState(DEFAULT_SETS);
  const [history, setHistory] = useState([]);
  const autoResetRef = useRef(null);
  const restGoalRef = useRef(REST_WINDOW);
  const { theme } = useTheme();

  const { seconds, isRunning, start, stop, reset } = useTimer(restGoalRef.current);

  const secondaryVariant = theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark';

  const remainingSets = useMemo(() => Math.max(goalSets - (currentSet - 1), 0), [goalSets, currentSet]);

  useEffect(() => {
    if (currentSet - 1 === goalSets && history.length) {
      autoResetRef.current = setTimeout(() => {
        setCurrentSet(1);
        setHistory([]);
        reset(restGoalRef.current);
      }, 3500);
    }
    return () => {
      if (autoResetRef.current) {
        clearTimeout(autoResetRef.current);
      }
    };
  }, [currentSet, goalSets, history.length, reset]);

  useEffect(() => {
    if (seconds === 0 && isRunning) {
      stop();
    }
  }, [seconds, isRunning, stop]);

  const completeSet = () => {
    const completedAt = new Date().toLocaleTimeString();
    setHistory((prev) => [...prev, { set: currentSet, completedAt }]);
    setCurrentSet((prev) => Math.min(prev + 1, goalSets + 1));
    reset(restGoalRef.current);
    start();
  };

  const adjustGoal = (event) => {
    const nextGoal = Number(event.target.value);
    setGoalSets(nextGoal);
    if (currentSet > nextGoal) {
      setCurrentSet(nextGoal);
    }
  };

  const resetWorkout = () => {
    setCurrentSet(1);
    setHistory([]);
    reset(restGoalRef.current);
    stop();
  };

  return (
    <div className={`workout-tracker ${theme}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="eyebrow mb-1">Challenge 7 · React Hooks</p>
          <h2 className="h5 mb-0">Workout Tracker</h2>
        </div>
        <button type="button" className="btn btn-outline-info btn-sm" onClick={resetWorkout}>
          Reset
        </button>
      </div>
      <div className="tracker-grid">
        <div className="tracker-tile">
          <p className="eyebrow mb-1">Current set</p>
          <p className="display-6 mb-0">{Math.min(currentSet, goalSets)}</p>
        </div>
        <div className="tracker-tile">
          <p className="eyebrow mb-1">Sets remaining</p>
          <p className="display-6 mb-0">{remainingSets}</p>
        </div>
        <div className="tracker-tile">
          <p className="eyebrow mb-1">Rest timer</p>
          <p className="display-6 mb-0">{formatSeconds(seconds)}</p>
          <small className="text-muted">{isRunning ? 'Counting down' : 'Paused'}</small>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="goal-sets" className="form-label">
          Sets goal
        </label>
        <input
          type="range"
          className="form-range"
          id="goal-sets"
          min="1"
          max="10"
          value={goalSets}
          onChange={adjustGoal}
        />
        <p className="text-muted small mb-0">Goal: {goalSets} sets</p>
      </div>
      <div className="mt-4 d-flex gap-2">
        <button type="button" className="btn btn-success" onClick={completeSet} disabled={currentSet > goalSets}>
          Complete set
        </button>
        <button type="button" className={`btn ${secondaryVariant}`} onClick={isRunning ? stop : start}>
          {isRunning ? 'Pause rest' : 'Start rest'}
        </button>
      </div>
      <div className="mt-4 history">
        <p className="eyebrow mb-2">History</p>
        {history.length === 0 && <p className="text-muted mb-0">Finish a set to log your progress.</p>}
        {history.length > 0 && (
          <ul className="list-unstyled mb-0">
            {history.map((item) => (
              <li key={item.set} className="history-item">
                <span>Set {item.set}</span>
                <span>{item.completedAt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WorkoutTracker;
