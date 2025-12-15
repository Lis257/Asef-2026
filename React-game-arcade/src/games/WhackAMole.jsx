import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const GAME_TIME = 30; // seconds

const WhackAMole = ({ goBack }) => {
  const [mole, setMole] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [running, setRunning] = useState(false);

  // Mole movement (gets faster later)
  useEffect(() => {
    if (!running) return;

    const speed =
      timeLeft > 20 ? 800 :
      timeLeft > 10 ? 600 :
      400;

    const timer = setInterval(() => {
      setMole(Math.floor(Math.random() * 9));
    }, speed);

    return () => clearInterval(timer);
  }, [running, timeLeft]);

  // Countdown timer
  useEffect(() => {
    if (!running) return;

    if (timeLeft === 0) {
      setRunning(false);
      setMole(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setRunning(true);
  };

  return (
    <GameLayout title="Whack-A-Mole" goBack={goBack}>
      <h3>Score: {score}</h3>
      <h4>Time: {timeLeft}s</h4>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 70px)',
          gap: '12px',
          justifyContent: 'center',
          margin: '15px 0'
        }}
      >
        {Array(9).fill(null).map((_, i) => (
          <div
            key={i}
            onClick={() => {
              if (running && i === mole) {
                setScore(s => s + 1);
                setMole(null);
              }
            }}
            style={{
              width: '70px',
              height: '70px',
              background: i === mole ? '#8d6e63' : '#ddd',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.8rem',
              cursor: running ? 'pointer' : 'default'
            }}
          >
            {i === mole ? '🐹' : ''}
          </div>
        ))}
      </div>

      {!running && timeLeft === GAME_TIME && (
        <button onClick={startGame}>Start Game</button>
      )}

      {!running && timeLeft === 0 && (
        <>
          <h2 style={{ color: '#4caf50' }}>Game Over!</h2>
          <p>Final Score: <strong>{score}</strong></p>
          <button onClick={startGame} style={{ marginRight: '10px' }}>
            Play Again
          </button>
          <button onClick={goBack}>⬅ Go Back</button>
        </>
      )}
    </GameLayout>
  );
};

export default WhackAMole;
