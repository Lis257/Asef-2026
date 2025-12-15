import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const EMOJIS = ['🍎','🍌','🍇','🍒','🍓','🍍'];

const shuffle = () =>
  [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);

const MemoryGame = ({ goBack }) => {
  const [cards, setCards] = useState(shuffle());
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleFlip = (idx) => {
    if (locked || flipped.includes(idx) || solved.includes(idx)) return;

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      setMoves(m => m + 1);

      const [a, b] = newFlipped;

      if (cards[a] === cards[b]) {
        setSolved(s => [...s, a, b]);
        setFlipped([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const restart = () => {
    setCards(shuffle());
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setLocked(false);
  };

  const won = solved.length === cards.length;

  return (
    <GameLayout title="Memory Game" goBack={goBack}>
      <p style={{ textAlign: 'center' }}>
        <strong>Moves:</strong> {moves}
      </p>

      {won && (
        <h3 style={{ color: 'green', textAlign: 'center' }}>
          You won in {moves} moves! 🎉
        </h3>
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 70px)',
            gap: '12px',
            margin: '20px 0'
          }}
        >
          {cards.map((emoji, i) => {
            const isVisible = flipped.includes(i) || solved.includes(i);

            return (
              <div
                key={i}
                onClick={() => handleFlip(i)}
                style={{
                  width: '70px',
                  height: '70px',
                  background: isVisible ? '#fff' : '#444',
                  borderRadius: '10px',
                  fontSize: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isVisible || locked ? 'default' : 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                  userSelect: 'none'
                }}
              >
                {isVisible ? emoji : ''}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={restart} style={{ padding: '8px 16px' }}>
          Restart
        </button>
      </div>
    </GameLayout>
  );
};

export default MemoryGame;
