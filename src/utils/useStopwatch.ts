import { useState, useRef } from 'react';

const initialValue = 0;
const intervalValue = 100;

const useStopwatch = () => {
  const [time, setTime] = useState(initialValue);
  let intervalRef = useRef<NodeJS.Timer | null>(null);

  const minutes = Math.floor(time / 1000 / 60);
  const seconds = Math.floor(time / 1000 - minutes * 60);

  const start = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + intervalValue);
    }, intervalValue);
  };

  const stop = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    setTime(initialValue);
    stop();
  };

  return {
    time,
    minutes,
    seconds,
    start,
    stop,
    reset,
    started: !!intervalRef.current,
  };
};

export default useStopwatch;
