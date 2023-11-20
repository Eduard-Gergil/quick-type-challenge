const getEstimate = (
  resultTempo: number,
  neededTempoArr: [number, number, number]
) => {
  if (resultTempo >= neededTempoArr[2]) {
    return { text: 'Отличная работа! ★★★', lose: false };
  }
  if (resultTempo >= neededTempoArr[1]) {
    return { text: 'А ты хорош! ★★☆', lose: false };
  }
  if (resultTempo >= neededTempoArr[1]) {
    return { text: 'Неплохо. ☆☆☆', lose: false };
  }
  return { text: 'Попробуй еще раз.', lose: true };
};

const Result: React.FC<{
  resultTempo: number;
  neededTempoArr: [number, number, number];
  isLose: boolean;
  moveNextLevel: () => void;
  replayLevel: () => void;
}> = ({ resultTempo, neededTempoArr, moveNextLevel, replayLevel }) => {
  const { text, lose } = getEstimate(resultTempo, neededTempoArr);

  return (
    <div>
      <div>{text}</div>
      <div>Tempo {resultTempo}s/min</div>

      {lose ? (
        <button onClick={replayLevel}>Переиграть</button>
      ) : (
        <>
          <button onClick={moveNextLevel}>Далее</button>
          <button onClick={replayLevel}>Переиграть</button>
        </>
      )}
    </div>
  );
};

export default Result;
