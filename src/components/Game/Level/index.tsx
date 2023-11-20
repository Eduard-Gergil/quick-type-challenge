import { useEffect, useState } from 'react';
import { LevelStatus } from '../../../types';
import GameBoard from './GameBoard';
import useStopwatch from '../../../utils/useStopwatch';
import Result from './Result';

type Levels = Array<{
  text: string;
  time: number;
  tempo: [number, number, number];
}>;

const levels: Levels = [
  {
    text: 'В шахматах существует более возможных партий, чем атомов в наблюдаемой части Вселенной. Это число называется "числом Шеннона" и оно примерно равно 10^120.',
    time: 10,
    tempo: [10, 20, 30],
  },
  {
    text: 'По некоторым данным, самым долгоживущим организмом на Земле является вид морских губок под названием "Моцартова соль". Некоторые особи этого вида могут проживать более 10 тысяч лет.',
    time: 10,
    tempo: [10, 20, 30],
  },
  {
    text: 'Пчелы могут использовать свои тела, чтобы создать вихрь вокруг источника воды и собирать воду. Они выстраивают цепочку и передают капли воды друг другу, создавая своеобразный "танец".',
    time: 10,
    tempo: [10, 20, 30],
  },
];

const inputValueInit = '';

const Level: React.FC<{ overGame: () => void }> = ({ overGame }) => {
  const [levelNumber, setLevelNumber] = useState(1);
  const [levelStatus, setLevelStatus] = useState<LevelStatus>('started');
  const [inputValue, setInputValue] = useState(inputValueInit);
  const {
    time,
    seconds,
    minutes,
    start: startStopwatch,
    stop: stopStopwatch,
    reset: resetStopwatch,
    started: stopwatchStarted,
  } = useStopwatch();
  const [paused, setPaused] = useState(false);

  const levelIdx = levelNumber - 1;
  const text = levels[levelIdx].text;

  const overLevel = () => setLevelStatus('over');
  const startLevel = () => {
    setInputValue(inputValueInit);
    resetStopwatch();
    setLevelStatus('started');
  };

  const startNextLevel = () => {
    if (levelNumber >= levels.length) {
      overGame();
      return;
    }
    setLevelNumber((prev) => (prev += 1));
    startLevel();
  };

  const replayLevel = () => {
    startLevel();
  };

  const tempo =
    inputValue.length && time
      ? Number(((inputValue.length / (time / 1000)) * 60).toFixed(2))
      : 0;

  useEffect(() => {
    if (!paused) {
      startStopwatch();
      return;
    }
    stopStopwatch();
  }, [paused]);

  useEffect(() => {
    if (levelStatus !== 'started') return;
    if (!inputValue) return;
    if (stopwatchStarted) return;
    startStopwatch();
  }, [inputValue]);

  useEffect(() => {
    let i = 0;
    while (i < text.length) {
      if (inputValue[i] !== text[i]) {
        break;
      }
      i++;
    }

    if (i < text.length) return;
    stopStopwatch();
    overLevel();
  }, [inputValue]);

  return (
    <>
      {levelStatus === 'over' ? (
        <Result
          resultTempo={tempo}
          neededTempoArr={levels[levelIdx].tempo}
          isLose={false}
          moveNextLevel={startNextLevel}
          replayLevel={replayLevel}
        />
      ) : (
        <GameBoard
          inputValue={inputValue}
          setInputValue={setInputValue}
          levelNumber={levelNumber}
          text={text}
          tempo={tempo}
          paused={paused}
          setPaused={setPaused}
          seconds={seconds}
          minutes={minutes}
        />
      )}
    </>
  );
};

export default Level;