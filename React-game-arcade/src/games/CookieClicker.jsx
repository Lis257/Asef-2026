import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const CookieClicker = ({ goBack }) => {
  const [score, setScore] = useState(0);
  return (
    <GameLayout title="Cookie Clicker" goBack={goBack}>
      <h1>{score}</h1>
      <button 
        onClick={() => setScore(s => s + 1)} 
        style={{ fontSize: '5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
        🍪
      </button>
      <p>Tap the cookie!</p>
    </GameLayout>
  );
};
export default CookieClicker;