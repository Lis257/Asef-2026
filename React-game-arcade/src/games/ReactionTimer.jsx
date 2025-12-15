import React, { useState, useRef } from 'react';
import GameLayout from '../components/GameLayout';

const ReactionTimer = ({ goBack }) => {
  const [state, setState] = useState('idle'); // idle, waiting, ready, result, early
  const [time, setTime] = useState(null);
  const [best, setBest] = useState(null);

  const startRef = useRef(null);
  const timeoutRef = useRef(null);

  const start = () => {
    setState('waiting');
    setTime(null);

    timeoutRef.current = setTimeout(() => {
      startRef.current = Date.now();
      setState('ready');
    }, 2000 + Math.random() * 2000);
  };

  const handleClick = () => {
    if (state === 'waiting') {
      clearTimeout(timeoutRef.current);
      setState('early');
    }

    if (state === 'ready') {
      const reaction = Date.now() - startRef.current;
      setTime(reaction);
      setBest(b => (b === null || reaction < b ? reaction : b));
      setState('result');
    }
  };

  const getMessage = () => {
    switch (state) {
      case 'idle': return 'Click Start';
      case 'waiting': return 'Wait for green...';
      case 'ready': return 'CLICK!';
      case 'early': return 'Too early 😅';
      case 'result': return `${time} ms`;
      default: return '';
    }
  };

  const getColor = () => {
    if (state === 'ready') return '#4caf50';
    if (state === 'early') return '#ff9800';
    return '#e53935';
  };

  return (
    <GameLayout title="Reaction Timer" goBack={goBack}>
      <div
        onClick={handleClick}
        style={{
          width: '100%',
          height: '220px',
          background: getColor(),
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          cursor: state === 'idle' ? 'default' : 'pointer',
          borderRadius: '12px',
          userSelect: 'none',
          transition: 'background 0.2s'
        }}
      >
        {getMessage()}
      </div>

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        {(state === 'idle' || state === 'result' || state === 'early') && (
          <button onClick={start} style={{ padding: '8px 18px' }}>
            Start
          </button>
        )}
      </div>

      {best !== null && (
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          🏆 Best time: <strong>{best} ms</strong>
        </p>
      )}
    </GameLayout>
  );
};

export default ReactionTimer;
