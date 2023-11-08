import { useState, useEffect } from 'react';
import Text from './Text';
import Timer from './Timer';
import TextArea from './TextArea';
import useTimer from '../../../../utils/useTimer';

const GameBoard: React.FC<IGameBoard> = ({
  levelNumber,
  text,
  availableTime,
  onGameOver,
  onGameFail,
}) => {
  const [value, setValue] = useState('');
  const { time, minutes, seconds, start } = useTimer(availableTime);

  const getMarkerPosition = () => {
    let markerPosition = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== value[i]) {
        break;
      }
      markerPosition += 1;
    }
    return markerPosition;
  };

  const markerPosition = getMarkerPosition();
  const hasError = markerPosition < value.length;

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (markerPosition === text.length) {
      onGameOver();
    }
  }, [value]);

  useEffect(() => {
    if (time === 0) {
      onGameFail();
    }
  }, [time]);

  return (
    <>
      <div>Уровень {levelNumber}</div>
      <Timer minutes={minutes} seconds={seconds} />
      <Text words={text} currentIdx={markerPosition} hasError={hasError} />
      <TextArea value={value} setValue={setValue} />
    </>
  );
};

export default GameBoard;

interface IGameBoard {
  levelNumber: number;
  text: string;
  availableTime: number;
  onGameOver: () => void;
  onGameFail: () => void;
}
