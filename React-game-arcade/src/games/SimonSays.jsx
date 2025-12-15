import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const COLORS = ['red', 'green', 'blue', 'yellow'];

const SimonSays = ({ goBack }) => {
  const [sequence, setSequence] = useState([]);
  const [userIndex, setUserIndex] = useState(0);
  const [activeColor, setActiveColor] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [acceptingInput, setAcceptingInput] = useState(false);
  const [message, setMessage] = useState('Press Start');
  const [round, setRound] = useState(0);

  const startGame = () => {
    setSequence([]);
    setUserIndex(0);
    setRound(0);
    setMessage('Watch the sequence');
    setPlaying(true);
    setTimeout(() => addStep([]), 500);
  };

  const addStep = (prevSeq) => {
    const next = [...prevSeq, COLORS[Math.floor(Math.random() * 4)]];
    setSequence(next);
    setRound(next.length);
    playSequence(next);
  };

  const playSequence = async (seq) => {
    setAcceptingInput(false);
    for (const color of seq) {
      setActiveColor(color);
      await delay(500);
      setActiveColor(null);
      await delay(250);
    }
    setUserIndex(0);
    setAcceptingInput(true);
    setMessage('Your turn');
  };

  const handleClick = (color) => {
    if (!acceptingInput) return;

    if (color !== sequence[userIndex]) {
      setMessage('Game Over!');
      setPlaying(false);
      setAcceptingInput(false);
      return;
    }

    const nextIndex = userIndex + 1;
    setUserIndex(nextIndex);

    if (nextIndex === sequence.length) {
      setMessage('Good! Next round...');
      setAcceptingInput(false);
      setTimeout(() => addStep(sequence), 1000);
    }
  };

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  return (
    <GameLayout title="Simon Says" goBack={goBack}>
      <h2 style={{ textAlign: 'center' }}>{message}</h2>
      <p style={{ textAlign: 'center' }}>Round: {round}</p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 100px)',
          gap: '15px',
          marginTop: '20px'
        }}>
          {COLORS.map(color => (
            <div
              key={color}
              onClick={() => handleClick(color)}
              style={{
                width: '100px',
                height: '100px',
                background: color,
                opacity: activeColor === color ? 1 : 0.6,
                borderRadius: '15px',
                cursor: acceptingInput ? 'pointer' : 'default',
                boxShadow: activeColor === color
                  ? '0 0 20px rgba(0,0,0,0.6)'
                  : '0 4px 6px rgba(0,0,0,0.3)',
                transition: 'all 0.2s',
                userSelect: 'none'
              }}
            />
          ))}
        </div>
      </div>

      {!playing && (
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <button onClick={startGame} style={{ padding: '10px 20px' }}>
            Start Game
          </button>
        </div>
      )}
    </GameLayout>
  );
};

export default SimonSays;
