import React from 'react';
import style from './styles.module.css';

const Text: React.FC<{
  words: string;
  currentIdx: number;
  hasError: boolean;
}> = ({ words, currentIdx, hasError }) => {
  const remainingWords = words.split('');
  const rightWords = remainingWords.splice(0, currentIdx, '').join('');
  let errorWords = '';

  if (hasError) {
    errorWords = remainingWords.splice(1, 1, '').join('');
  }

  remainingWords.join('');

  return (
    <div className={style.text}>
      <span style={{ background: 'aqua' }}>{rightWords}</span>
      <span style={{ background: 'red' }}>{errorWords}</span>
      {remainingWords}
    </div>
  );
};

export default Text;
