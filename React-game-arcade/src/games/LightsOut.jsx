import React, { useState } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const LightsOut = ({ goBack }) => {
  const [board, setBoard] = useState(Array(5).fill().map(() => Array(5).fill(false)));

  const toggle = (r, c) => {
    const newBoard = board.map(row => [...row]);
    const flip = (ri, ci) => {
      if (ri >= 0 && ri < 5 && ci >= 0 && ci < 5) newBoard[ri][ci] = !newBoard[ri][ci];
    };
    flip(r, c); flip(r-1, c); flip(r+1, c); flip(r, c-1); flip(r, c+1);
    setBoard(newBoard);
  };

  const hasWon = board.every(row => row.every(cell => !cell));

  return (
    <GameLayout title="Lights Out" goBack={goBack}>
      <p>Turn all lights off!</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 45px)', gap: '5px' }}>
        {board.map((row, r) => row.map((cell, c) => (
          <div key={`${r}-${c}`} onClick={() => toggle(r, c)} style={{
            width: '45px', height: '45px', borderRadius: '4px',
            background: cell ? '#ffff00' : '#333', cursor: 'pointer',
            boxShadow: cell ? '0 0 10px #ffff00' : 'none'
          }} />
        )))}
      </div>
      {hasWon && <h3 style={{color: 'gold'}}>Puzzle Cleared!</h3>}
    </GameLayout>
  );
};
export default LightsOut;