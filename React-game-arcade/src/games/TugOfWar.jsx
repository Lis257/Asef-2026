import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const TugOfWar = ({ goBack }) => {
  const [pos, setPos] = useState(50); // 0 = P1 win, 100 = P2 win
  const [winner, setWinner] = useState(null);

  const pull = (dir) => {
    if (winner) return;

    setPos(prev => {
      const next = prev + dir;
      if (next <= 0) {
        setWinner('Player 1');
        return 0;
      }
      if (next >= 100) {
        setWinner('Player 2');
        return 100;
      }
      return next;
    });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return; // prevent holding key
      if (e.key === 'a' || e.key === 'A') pull(-3);
      if (e.key === 'l' || e.key === 'L') pull(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [winner]);

  const resetGame = () => {
    setPos(50);
    setWinner(null);
  };

  return (
    <GameLayout title="Tug Of War" goBack={goBack}>
      {winner ? (
        <h2>🏆 {winner} Wins!</h2>
      ) : (
        <p>
          Player 1: <strong>A</strong> &nbsp; | &nbsp;
          Player 2: <strong>L</strong>
        </p>
      )}

      {/* Rope */}
      <div
        style={{
          width: '320px',
          height: '40px',
          border: '2px solid #333',
          borderRadius: '20px',
          position: 'relative',
          margin: '25px auto',
          background: '#eee',
          overflow: 'hidden'
        }}
      >
        {/* Center line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: '#000'
          }}
        />

        {/* Rope marker */}
        <div
          style={{
            position: 'absolute',
            left: `${pos}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#555',
            transition: 'left 0.05s linear'
          }}
        />
      </div>

      {/* Buttons (optional fallback / mobile) */}
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
        <button onClick={() => pull(-3)} style={{ padding: '15px', background: '#ff5252' }}>
          P1 Pull (A)
        </button>
        <button onClick={() => pull(3)} style={{ padding: '15px', background: '#448aff' }}>
          P2 Pull (L)
        </button>
      </div>

      {winner && (
        <button onClick={resetGame} style={{ marginTop: '20px' }}>
          🔁 Play Again
        </button>
      )}
    </GameLayout>
  );
};

export default TugOfWar;
