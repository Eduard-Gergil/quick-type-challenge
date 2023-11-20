import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { FormatedTextArray, SignState } from '..';

const Text: React.FC<{
  words: FormatedTextArray;
  currentIdx: number;
}> = ({ words, currentIdx }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const findInd = words.findIndex((sign) => sign.state === 'undefined');
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;
    if (!containerRef.current) return;
    const lineHeight = 28;
    const cursorTopPosition = cursorRef.current.offsetTop;

    if (cursorTopPosition <= lineHeight) {
      containerRef.current.scrollTop = 0;
      return;
    }

    containerRef.current.scrollTop = cursorTopPosition - lineHeight;
  }, [currentIdx]);

  return (
    <div className={styles.text} ref={containerRef}>
      <span>
        {words
          .slice(0, findInd > -1 ? findInd : words.length)
          .map(({ sign, state }, i) => (
            <Sign sign={sign} state={state} key={i} />
          ))}
      </span>

      <Cursor currentIdx={currentIdx} ref={cursorRef} />

      {findInd > -1 && (
        <span style={{ marginLeft: '-13.2px' }}>
          {words.slice(findInd).map(({ sign, state }, i) => (
            <Sign sign={sign} state={state} key={i} />
          ))}
        </span>
      )}
    </div>
  );
};

export default Text;

const Cursor = React.forwardRef<
  HTMLSpanElement,
  {
    currentIdx: number;
  }
>(({ currentIdx }, ref) => {
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    setWaiting(false);
    const timeout = setTimeout(() => {
      setWaiting(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentIdx]);

  return (
    <span
      className={`${styles.underline} ${waiting ? styles.waiting : ''}`}
      ref={ref}
    >
      _
    </span>
  );
});

const Sign: React.FC<{
  sign: string;
  state: SignState;
}> = ({ sign, state }) => {
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!ref.current) return;
  //   console.log(ref.current.clientWidth);
  // }, []);

  return (
    <span
      ref={ref}
      className={`${
        state === 'correct'
          ? styles.correct
          : state === 'incorrect'
          ? styles.incorrect
          : ''
      } ${state === 'miss' ? styles.miss : ''}`}
    >
      {sign}
    </span>
  );
};
