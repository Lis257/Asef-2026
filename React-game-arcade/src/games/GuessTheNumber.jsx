import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const GuessTheNumber = ({ goBack }) => {
  const [target] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [msg, setMsg] = useState('Guess 1-100');

  const check = () => {
    const n = Number(guess);
    if(n === target) setMsg("✅ Correct!");
    else if(n < target) setMsg("Too Low 📉");
    else setMsg("Too High 📈");
  };

  return (
    <GameLayout title="Guess The Number" goBack={goBack}>
      <h3>{msg}</h3>
      <input type="number" value={guess} onChange={e => setGuess(e.target.value)} style={{ padding: '5px' }} />
      <button onClick={check} style={{ marginLeft: '10px', background: '#333', color: 'white' }}>Guess</button>
    </GameLayout>
  );
};
export default GuessTheNumber;