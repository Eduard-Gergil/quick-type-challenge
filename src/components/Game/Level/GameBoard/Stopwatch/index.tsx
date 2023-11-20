import React from 'react';
import styles from './styles.module.css'

const Stopwatch: React.FC<{ minutes: number; seconds: number }> = ({
  minutes,
  seconds,
}) => {
  const formatedMinutes = minutes > 9 ? minutes : '0' + minutes;
  const formatedSeconds = seconds > 9 ? seconds : '0' + seconds;

  return (
    <div className={styles.stopwatch}>
      Время: {formatedMinutes}:{formatedSeconds}
    </div>
  );
};

export default Stopwatch;
