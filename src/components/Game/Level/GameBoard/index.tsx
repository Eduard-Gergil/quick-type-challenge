import React, { useState, useEffect, useRef } from 'react';
import Text from './Text';
import LevelNumber from './LevelNumber';
import Tempo from './Tempo';
import TextInput from './TextInput';
import styles from './styles.module.css';
import PauseButton from './PauseButton';
import Stopwatch from './Stopwatch';

export type FormatedTextArray = Array<{
  sign: string;
  state: SignState;
}>;

export type SignState = 'undefined' | 'correct' | 'incorrect' | 'miss';

interface IGameBoard {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  tempo: number;
  levelNumber: number;
  seconds: number;
  minutes: number;
  text: string;
  paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const formatText = (inputValue: string, text: string) => {
  const length =
    inputValue.length > text.length ? inputValue.length : text.length;
  const newArr: FormatedTextArray = [];
  for (let i = 0; i < length; i++) {
    if (!inputValue[i]) {
      newArr.push({ sign: text[i], state: 'undefined' });
      continue;
    }
    if (inputValue[i] === ' ') {
      if (!text[i]) {
        newArr.push({
          sign: inputValue[i],
          state: 'incorrect',
        });
        continue;
      }
      if (inputValue[i] !== text[i]) {
        newArr.push({
          sign: text[i],
          state: 'miss',
        });
        continue;
      }
    }
    if (!text[i] || inputValue[i] !== text[i]) {
      newArr.push({
        sign: inputValue[i],
        state: 'incorrect',
      });
      continue;
    }
    newArr.push({ sign: text[i], state: 'correct' });
  }

  return newArr;
};

const GameBoard: React.FC<IGameBoard> = ({
  paused,
  setPaused,
  inputValue,
  setInputValue,
  seconds,
  minutes,
  tempo,
  levelNumber,
  text,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatedText: FormatedTextArray = formatText(inputValue, text);

  const onPauseCancel = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  const onFocus = () => {
    setPaused(false);
  };

  const onBlur = () => {
    setPaused(true);
  };

  const pauseLevel = () => setPaused(true);
  const unpauseLevel = () => setPaused(false);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener('click', onPauseCancel);

    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener('click', onPauseCancel);
    };
  }, []);

  // useEffect(() => {
  //   if (!inputRef.current) return;
  //   inputRef.current.addEventListener('focus', onFocus);
  //   inputRef.current.addEventListener('blur', onBlur);

  //   return () => {
  //     if (!inputRef.current) return;
  //     inputRef.current.removeEventListener('focus', onFocus);
  //     inputRef.current.removeEventListener('blur', onBlur);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (position === text.length) {
  //     onGameOver();
  //   }
  // }, [position]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={`${styles.gameBoard} ${paused ? styles.blur : ''}`}
        ref={ref}
      >
        <LevelNumber levelNumber={levelNumber} />
        {/* <PauseButton pauseLevel={pauseLevel} /> */}

        <Stopwatch minutes={minutes} seconds={seconds} />
        <Tempo tempo={tempo} />
        {/* <div className={styles.headerRow}>
          
        </div> */}

        <Text words={formatedText} currentIdx={inputValue.length} />
        <TextInput
          value={inputValue}
          setValue={setInputValue}
          inputRef={inputRef}
        />
      </div>

      {paused && <PauseButton pauseLevel={pauseLevel} />}
    </div>
  );
};

export default GameBoard;
