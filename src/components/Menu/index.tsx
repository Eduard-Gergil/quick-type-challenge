import React from 'react';

const Menu: React.FC<{ moveGame: () => void }> = ({ moveGame }) => {
  return (
    <div>
      <div>Player</div>
      <button onClick={moveGame}>Играть</button>
      {/* <button>Выбрать уровень</button> */}
    </div>
  );
};

export default Menu;
