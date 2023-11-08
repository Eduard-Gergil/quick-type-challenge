import React from 'react';

const Timer: React.FC<{ minutes: number; seconds: number }> = ({
  minutes,
  seconds,
}) => {
  const formatedMinutes = minutes > 9 ? minutes : '0' + minutes;
  const formatedSeconds = seconds > 9 ? seconds : '0' + seconds;

  return (
    <div>
      {formatedMinutes}:{formatedSeconds}
    </div>
  );
};

export default Timer;
