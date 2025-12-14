import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const cards = ['🍎','🍎','🍌','🍌','🍇','🍇','🍒','🍒'].sort(() => Math.random() - 0.5);

const MemoryGame = ({ goBack }) => {
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  const handleFlip = (idx) => {
    if(flipped.length === 2 || flipped.includes(idx) || solved.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    
    if(newFlipped.length === 2) {
      if(cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <GameLayout title="Memory Game" goBack={goBack}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {cards.map((emoji, i) => (
          <div key={i} onClick={() => handleFlip(i)} style={{
            width: '50px', height: '50px', background: flipped.includes(i) || solved.includes(i) ? 'white' : '#333',
            border: '1px solid #ccc', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>
            {flipped.includes(i) || solved.includes(i) ? emoji : ''}
          </div>
        ))}
      </div>
    </GameLayout>
  );
};
export default MemoryGame;