import React, { useState, useEffect } from 'react';

const emojis = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍍', '🥝', '🥥'];
const MemoryDuel = ({ goBack }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]); // Array of indices
  const [turn, setTurn] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });

  useEffect(() => {
    const deck = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(deck);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || matched.includes(index) || flipped.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setScores(s => ({ ...s, [turn]: s[turn] + 1 }));
        setFlipped([]);
        // Player keeps turn if they match!
      } else {
        setTimeout(() => {
          setFlipped([]);
          setTurn(turn === 1 ? 2 : 1);
        }, 1000);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>🃏 Memory Duel</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
        <h3 style={{ color: turn===1 ? '#0f0' : '#fff' }}>P1 Score: {scores[1]}</h3>
        <h3 style={{ color: turn===2 ? '#0f0' : '#fff' }}>P2 Score: {scores[2]}</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 60px)', gap: 10, justifyContent: 'center', marginTop: 20 }}>
        {cards.map((card, i) => (
          <div 
            key={i} 
            onClick={() => handleCardClick(i)}
            style={{ 
              width: 60, height: 60, background: flipped.includes(i) || matched.includes(i) ? '#fff' : '#444', 
              color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', cursor: 'pointer' 
            }}
          >
            {(flipped.includes(i) || matched.includes(i)) ? card : '?'}
          </div>
        ))}
      </div>
      <br/>
      <button className="back-btn" onClick={goBack}>Back</button>
    </div>
  );
};
export default MemoryDuel;