import React from 'react';

const GameOver: React.FC<{ moveMenu: () => void }> = ({ moveMenu }) => {
  return (
    <div>
      <div>Поздравляю!</div>
      <button onClick={moveMenu}>Меню</button>
    </div>
  );
};

export default GameOver;
