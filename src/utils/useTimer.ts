import { useState, useRef, useEffect } from 'react';

const useTimer = (initialValue = 60) => {
  const [time, setTime] = useState(initialValue);
  let intervalRef = useRef<NodeJS.Timer | null>(null);

  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  const start = () => {
    if (time <= 0) return;
    reset();
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  };

  const stop = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    setTime(initialValue)
    stop()
  }

  useEffect(() => {
    if (time <= 0) stop();
  }, [time]);

  return { time, minutes, seconds, start, stop };
};

export default useTimer;
