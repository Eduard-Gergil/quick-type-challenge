const Tempo: React.FC<{ tempo: number }> = ({ tempo }) => {
  return <div style={{ fontSize: '24px' }}>Симв./м: {tempo}</div>;
};

export default Tempo;
