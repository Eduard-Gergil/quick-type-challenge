import React, { useEffect, useState } from 'react';
import { LevelStatus } from '../../types';
import GameOver from './GameOver';
import Level from './Level';

const levels = [
  { text: 'Hello', time: 10 },
  { text: 'Qqq', time: 3 },
];

type GameStatus = 'started' | 'over';

const Game: React.FC<{ moveMenu: () => void }> = ({ moveMenu }) => {
  const [levelIdx, setLevelIdx] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('started');
  const [levelStatus, setLevelStatus] = useState<LevelStatus>('started');

  const overLevel = () => setLevelStatus('over');
  const failLevel = () => setLevelStatus('failed');
  const startLevel = () => setLevelStatus('started');

  const startNextLevel = () => {
    if (levelIdx + 1 >= levels.length) return;
    setLevelIdx((prev) => (prev += 1));
    startLevel();
  };

  useEffect(() => {
    if (levelIdx + 1 < levels.length) return;
    if (levelStatus !== 'over') return;
    setGameStatus('over');
  }, [levelIdx, levelStatus]);

  return (
    <>
      {gameStatus === 'over' ? (
        <GameOver moveMenu={moveMenu} />
      ) : (
        <Level
          levelNumber={levelIdx + 1}
          text={levels[levelIdx].text}
          availableTime={levels[levelIdx].time}
          startNextLevel={startNextLevel}
          status={levelStatus}
          startLevel={startLevel}
          overLevel={overLevel}
          failLevel={failLevel}
        />
      )}
    </>
  );
};

export default Game;
