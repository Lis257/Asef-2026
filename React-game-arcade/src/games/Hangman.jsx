import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const Hangman = ({ goBack }) => {
  const word = "REACT";
  const [guessed, setGuessed] = useState([]);
  
  const wrong = guessed.filter(l => !word.includes(l)).length;
  const isWon = word.split('').every(l => guessed.includes(l));

  return (
    <GameLayout title="Hangman" goBack={goBack}>
      <h3>Errors: {wrong} / 6</h3>
      <div style={{ fontSize: '2rem', letterSpacing: '5px', marginBottom: '20px' }}>
        {word.split('').map(l => guessed.includes(l) ? l : '_')}
      </div>
      {isWon ? <h2 style={{color: 'green'}}>You Won!</h2> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
            <button key={l} disabled={guessed.includes(l) || wrong >= 6} onClick={() => setGuessed([...guessed, l])} 
            style={{ padding: '5px', fontSize: '0.8rem' }}>{l}</button>
          ))}
        </div>
      )}
    </GameLayout>
  );
};
export default Hangman;