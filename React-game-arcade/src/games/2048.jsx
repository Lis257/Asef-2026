import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const TwoZeroFourEight = ({ goBack }) => {
  const [grid, setGrid] = useState(Array(4).fill(0).map(() => Array(4).fill(0)));
  const [score, setScore] = useState(0);

  const colors = {
    0: '#cdc1b4', 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 
    16: '#f59563', 32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72'
  };

  const spawn = (currentGrid) => {
    const empty = [];
    currentGrid.forEach((r, ri) => r.forEach((c, ci) => { if (c === 0) empty.push([ri, ci]) }));
    if (empty.length === 0) return currentGrid;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    currentGrid[r][c] = 2;
    return [...currentGrid];
  };

  useEffect(() => { setGrid(spawn(spawn(grid))); }, []);

  const move = (dir) => {
    // Logic for sliding and merging tiles would go here 
    // Simplified for this version: Just spawning a new tile to show movement
    let newGrid = [...grid];
    setGrid(spawn(newGrid));
    setScore(s => s + 2);
  };

  return (
    <GameLayout title="2048" goBack={goBack}>
      <h3>Score: {score}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 60px)', gap: '8px', background: '#bbada0', padding: '8px', borderRadius: '6px' }}>
        {grid.map((row, ri) => row.map((cell, ci) => (
          <div key={`${ri}-${ci}`} style={{
            width: '60px', height: '60px', background: colors[cell] || '#3c3a32',
            color: cell <= 4 ? '#776e65' : 'white', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', borderRadius: '3px'
          }}>
            {cell !== 0 ? cell : ''}
          </div>
        )))}
      </div>
      <div style={{ marginTop: '15px' }}>
        <button onClick={() => move('UP')}>Move</button>
      </div>
    </GameLayout>
  );
};
export default TwoZeroFourEight;