import React, { useState } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const SlidingPuzzle = ({ goBack }) => {
  const goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const [tiles, setTiles] = useState([1, 2, 3, 4, 0, 5, 7, 8, 6]);
  const [moves, setMoves] = useState(0);

  const swap = (idx) => {
    const emptyIdx = tiles.indexOf(0);
    const validMoves = [idx-1, idx+1, idx-3, idx+3];
    
    if (validMoves.includes(emptyIdx)) {
      const newTiles = [...tiles];
      [newTiles[idx], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[idx]];
      setTiles(newTiles);
      setMoves(m => m + 1);
    }
  };

  const isWon = JSON.stringify(tiles) === JSON.stringify(goal);

  return (
    <GameLayout title="Sliding Tiles" goBack={goBack}>
      <p>Moves: {moves}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 70px)', gap: '10px' }}>
        {tiles.map((tile, i) => (
          <button key={i} onClick={() => swap(i)} style={{
            width: '70px', height: '70px', fontSize: '1.5rem',
            background: tile === 0 ? '#eee' : '#646cff',
            color: 'white', border: 'none', borderRadius: '8px',
            visibility: tile === 0 ? 'hidden' : 'visible'
          }}>
            {tile}
          </button>
        ))}
      </div>
      {isWon && <h2 style={{color: 'green'}}>You Solved It!</h2>}
    </GameLayout>
  );
};
export default SlidingPuzzle;