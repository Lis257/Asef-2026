import React, { useState, useEffect } from 'react';

const ClickWar = ({ goBack }) => {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  // Timer
  useEffect(() => {
    if (!started || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, timeLeft]);

  // Keyboard controls (A = P1, L = P2)
  useEffect(() => {
    const handleKey = (e) => {
      if (!started || timeLeft <= 0) return;

      if (e.key.toLowerCase() === 'a') {
        setScore1(s => s + 1);
      }
      if (e.key.toLowerCase() === 'l') {
        setScore2(s => s + 1);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [started, timeLeft]);

  const resetGame = () => {
    setStarted(false);
    setTimeLeft(10);
    setScore1(0);
    setScore2(0);
  };

  const winner =
    score1 > score2 ? 'PLAYER 1 WINS!' :
    score2 > score1 ? 'PLAYER 2 WINS!' :
    'DRAW!';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      
      {/* GAME AREA */}
      <div style={{ flex: 1, display: 'flex' }}>
        
        {/* PLAYER 1 */}
        <div
          onClick={() => started && timeLeft > 0 && setScore1(s => s + 1)}
          style={{
            flex: 1,
            background: '#ff4d4d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer'
          }}
        >
          <h1 style={{ fontSize: '5rem', margin: 0 }}>{score1}</h1>
          <p>PLAYER 1</p>
          <small>Press A</small>
        </div>

        {/* PLAYER 2 */}
        <div
          onClick={() => started && timeLeft > 0 && setScore2(s => s + 1)}
          style={{
            flex: 1,
            background: '#4d79ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer'
          }}
        >
          <h1 style={{ fontSize: '5rem', margin: 0 }}>{score2}</h1>
          <p>PLAYER 2</p>
          <small>Press L</small>
        </div>
      </div>

      {/* OVERLAY */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0,0,0,0.85)',
        padding: '25px',
        borderRadius: '12px',
        textAlign: 'center',
        color: 'white',
        minWidth: '260px'
      }}>
        {!started ? (
          <>
            <h2>Click War</h2>
            <p>P1: A key</p>
            <p>P2: L key</p>
            <button
              style={{ fontSize: '18px', padding: '10px 30px' }}
              onClick={() => {
                resetGame();
                setStarted(true);
              }}
            >
              START
            </button>
          </>
        ) : timeLeft === 0 ? (
          <>
            <h2>{winner}</h2>
            <button onClick={resetGame}>Play Again</button>
          </>
        ) : (
          <h2>⏰ {timeLeft}s</h2>
        )}

        <br />
        <button onClick={goBack}>Exit</button>
      </div>
    </div>
  );
};

export default ClickWar;
