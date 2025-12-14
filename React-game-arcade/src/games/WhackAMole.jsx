import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const WhackAMole = ({ goBack }) => {
  const [mole, setMole] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setMole(Math.floor(Math.random() * 9)), 700);
    return () => clearInterval(timer);
  }, []);

  return (
    <GameLayout title="Whack-A-Mole" goBack={goBack}>
      <h3>Score: {score}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {Array(9).fill(null).map((_, i) => (
          <div key={i} onClick={() => i === mole && setScore(s => s + 1)} style={{
            width: '60px', height: '60px', background: i === mole ? '#8d6e63' : '#ccc',
            borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'
          }}>
            {i === mole ? '🐹' : ''}
          </div>
        ))}
      </div>
    </GameLayout>
  );
};
export default WhackAMole;