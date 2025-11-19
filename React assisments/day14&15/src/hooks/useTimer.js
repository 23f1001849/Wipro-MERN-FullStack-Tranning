import { useCallback, useEffect, useRef, useState } from 'react';

const useTimer = (initialSeconds = 0) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const clearExistingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = useCallback(() => {
    if (intervalRef.current) {
      return;
    }
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    clearExistingInterval();
  }, []);

  const reset = useCallback((nextValue = initialSeconds) => {
    setSeconds(nextValue);
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds === 0 && isRunning) {
      setIsRunning(false);
      clearExistingInterval();
    }
  }, [isRunning, seconds]);

  useEffect(() => () => clearExistingInterval(), []);

  return { seconds, isRunning, start, stop, reset };
};

export default useTimer;
