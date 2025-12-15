import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const CookieClicker = ({ goBack }) => {
  const [cookies, setCookies] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [auto, setAuto] = useState(0);

  // Auto clicker logic
  useEffect(() => {
    if (auto === 0) return;
    const interval = setInterval(() => {
      setCookies(c => c + auto);
    }, 1000);
    return () => clearInterval(interval);
  }, [auto]);

  return (
    <GameLayout title="Cookie Clicker" goBack={goBack}>
      {/* Score */}
      <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
        🍪 {cookies}
      </h1>

      {/* Cookie */}
      <button
        onClick={() => setCookies(c => c + clickPower)}
        style={{
          fontSize: '3.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        🍪
      </button>

      {/* Stats */}
      <p style={{ margin: '6px 0' }}>
        Per click: <strong>{clickPower}</strong>
      </p>
      <p style={{ margin: '6px 0' }}>
        Per second: <strong>{auto}</strong>
      </p>

      {/* Upgrades */}
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={() => {
            if (cookies >= 10) {
              setCookies(c => c - 10);
              setClickPower(p => p + 1);
            }
          }}
          style={{ margin: '4px' }}
        >
          +1 Click (10🍪)
        </button>

        <button
          onClick={() => {
            if (cookies >= 25) {
              setCookies(c => c - 25);
              setAuto(a => a + 1);
            }
          }}
          style={{ margin: '4px' }}
        >
          +1 / sec (25🍪)
        </button>
      </div>

      {/* Controls */}
      <div style={{ marginTop: '12px' }}>
        <button
          onClick={() => {
            setCookies(0);
            setClickPower(1);
            setAuto(0);
          }}
          style={{ marginRight: '8px' }}
        >
          Reset
        </button>

        <button onClick={goBack}>
          ⬅ Go Back
        </button>
      </div>
    </GameLayout>
  );
};

export default CookieClicker;
