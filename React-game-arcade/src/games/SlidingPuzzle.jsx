import React, { useState } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const SlidingPuzzle = ({ goBack }) => {
  const goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const [tiles, setTiles] = useState([1, 2, 3, 4, 0, 5, 7, 8, 6]);
  const [moves, setMoves] = useState(0);

  const canSwap = (idx, emptyIdx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const eRow = Math.floor(emptyIdx / 3);
    const eCol = emptyIdx % 3;

    return (
      (row === eRow && Math.abs(col - eCol) === 1) ||
      (col === eCol && Math.abs(row - eRow) === 1)
    );
  };

  const swap = (idx) => {
    const emptyIdx = tiles.indexOf(0);
    if (!canSwap(idx, emptyIdx)) return;

    const newTiles = [...tiles];
    [newTiles[idx], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[idx]];
    setTiles(newTiles);
    setMoves(m => m + 1);
  };

  const isWon = tiles.every((v, i) => v === goal[i]);

  return (
    <GameLayout title="Sliding Tiles" goBack={goBack}>
      <p><strong>Moves:</strong> {moves}</p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 70px)',
          gap: '10px'
        }}>
          {tiles.map((tile, i) => (
            <button
              key={i}
              onClick={() => swap(i)}
              style={{
                width: '70px',
                height: '70px',
                fontSize: '1.5rem',
                background: tile === 0 ? '#eee' : '#646cff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                visibility: tile === 0 ? 'hidden' : 'visible',
                cursor: tile === 0 ? 'default' : 'pointer'
              }}
            >
              {tile}
            </button>
          ))}
        </div>
      </div>

      <p style={{ marginTop: '10px' }}>
        Click a tile next to the empty space to move it.
      </p>

      {isWon && <h2 style={{ color: 'green' }}>You Solved It! 🎉</h2>}
    </GameLayout>
  );
};

export default SlidingPuzzle;
