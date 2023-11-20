import styles from './styles.module.css';

const PauseIcon = () => {
  return (
    <div className={styles.pauseIcon}>
      <div />
      <div />
    </div>
  );
};

const PauseButton: React.FC<{ pauseLevel: () => void }> = ({ pauseLevel }) => {
  const onClick = () => {
    pauseLevel();
  };

  return (
    <button className={styles.pauseButton} onClick={onClick}>
      <PauseIcon /> Пауза
    </button>
  );
};

export default PauseButton;
