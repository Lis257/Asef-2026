import React, { useState } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const COLORS = ['#FF5733', '#33FF57', '#3357FF', '#F333FF'];

const ColorFlood = ({ goBack }) => {
  const [grid, setGrid] = useState(
    Array(8).fill().map(() =>
      Array(8).fill().map(() => COLORS[Math.floor(Math.random() * 4)])
    )
  );
  const [moves, setMoves] = useState(0);

  const flood = (newColor) => {
    const startColor = grid[0][0];
    if (newColor === startColor) return;

    const newGrid = [...grid.map(r => [...r])];
    const fill = (r, c) => {
      if (r < 0 || r >= 8 || c < 0 || c >= 8 || newGrid[r][c] !== startColor) return;
      newGrid[r][c] = newColor;
      fill(r + 1, c);
      fill(r - 1, c);
      fill(r, c + 1);
      fill(r, c - 1);
    };

    fill(0, 0);
    setGrid(newGrid);
    setMoves(m => m + 1);
  };

  return (
    <GameLayout title="Color Flood" goBack={goBack}>
      <p style={{ textAlign: 'center' }}>Moves: {moves} / 25</p>

      {/* Centered Grid */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 25px)',
          gap: '2px',
          marginBottom: '20px'
        }}>
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                style={{ width: '25px', height: '25px', background: cell }}
              />
            ))
          )}
        </div>
      </div>

      {/* Centered Color Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {COLORS.map(color => (
          <button
            key={color}
            onClick={() => flood(color)}
            style={{
              background: color,
              width: '40px',
              height: '40px',
              margin: '5px',
              borderRadius: '50%'
            }}
          />
        ))}
      </div>
    </GameLayout>
  );
};

export default ColorFlood;
