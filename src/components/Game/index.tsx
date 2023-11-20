import React, { useState } from 'react';
import GameOver from './GameOver';
import Level from './Level';

type GameStatus = 'started' | 'over';

const Game: React.FC<{ moveMenu: () => void }> = ({ moveMenu }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('started');

  const overGame = () => setGameStatus('over');

  return (
    <>
      {gameStatus === 'over' ? (
        <GameOver moveMenu={moveMenu} />
      ) : (
        <Level overGame={overGame} />
      )}
    </>
  );
};

export default Game;
