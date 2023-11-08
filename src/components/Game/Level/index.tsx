import { LevelStatus } from '../../../types';
import GameBoard from './GameBoard';

const Level: React.FC<ILevel> = ({
  levelNumber,
  status,
  text,
  availableTime,
  startNextLevel,
  startLevel,
  overLevel,
  failLevel,
}) => {
  return (
    <>
      {status === 'failed' ? (
        <>
          'Game Failed :('
          <button onClick={startLevel}>Повторить</button>
        </>
      ) : status === 'over' ? (
        <>
          'Game over!'
          <button onClick={startNextLevel}>Продолжить</button>
        </>
      ) : (
        <GameBoard
          levelNumber={levelNumber}
          text={text}
          availableTime={availableTime}
          onGameOver={overLevel}
          onGameFail={failLevel}
        />
      )}
    </>
  );
};

export default Level;

interface ILevel {
  levelNumber: number;
  status: LevelStatus;
  text: string;
  availableTime: number;
  startNextLevel: () => void;
  startLevel: () => void;
  overLevel: () => void;
  failLevel: () => void;
}
