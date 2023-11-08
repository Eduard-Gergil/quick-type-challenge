import React, { useState } from 'react';
import styles from './styles.module.css';
import Menu from '../Menu';
import Game from '../Game';

type PlayerPosition = 'menu' | 'game';

const GameEnv: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>('menu');

  const moveGame = () => {
    setPlayerPosition('game');
  };

  const moveMenu = () => {
    setPlayerPosition('menu');
  };

  return (
    <div className={styles.game_desk}>
      {playerPosition === 'menu' ? (
        <Menu moveGame={moveGame} />
      ) : (
        <Game moveMenu={moveMenu} />
      )}
    </div>
  );
};

export default GameEnv;
