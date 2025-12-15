import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const SIZE = 4;

const TwoZeroFourEight = ({ goBack }) => {
  const [grid, setGrid] = useState(
    Array(SIZE).fill(null).map(() => Array(SIZE).fill(0))
  );
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const colors = {
    0: '#cdc1b4', 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179',
    16: '#f59563', 32: '#f67c5f', 64: '#f65e3b',
    128: '#edcf72', 256: '#edcc61', 512: '#edc850',
    1024: '#edc53f', 2048: '#edc22e'
  };

  const spawnTile = (g) => {
    const empty = [];
    g.forEach((r, y) =>
      r.forEach((c, x) => c === 0 && empty.push([y, x]))
    );
    if (!empty.length) return g;

    const [y, x] = empty[Math.floor(Math.random() * empty.length)];
    const newGrid = g.map(r => [...r]);
    newGrid[y][x] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
  };

  const slideRow = (row) => {
    const filtered = row.filter(v => v !== 0);
    const result = [];
    let gained = 0;

    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i] === filtered[i + 1]) {
        const merged = filtered[i] * 2;
        result.push(merged);
        gained += merged;
        i++;
      } else {
        result.push(filtered[i]);
      }
    }

    while (result.length < SIZE) result.push(0);
    return { row: result, gained };
  };

  const rotate = (m) =>
    m[0].map((_, i) => m.map(r => r[i]).reverse());

  const move = (dir) => {
    if (gameOver) return;

    let newGrid = grid.map(r => [...r]);
    let gainedScore = 0;

    const rotateTimes = { LEFT: 0, UP: 1, RIGHT: 2, DOWN: 3 }[dir];

    for (let i = 0; i < rotateTimes; i++) newGrid = rotate(newGrid);

    const moved = newGrid.map(row => {
      const res = slideRow(row);
      gainedScore += res.gained;
      return res.row;
    });

    for (let i = 0; i < (4 - rotateTimes) % 4; i++) {
      newGrid = rotate(moved);
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      const spawned = spawnTile(newGrid);
      setGrid(spawned);
      setScore(s => s + gainedScore);
      if (isGameOver(spawned)) setGameOver(true);
    }
  };

  const isGameOver = (g) => {
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (g[y][x] === 0) return false;
        if (g[y][x] === g[y]?.[x + 1]) return false;
        if (g[y][x] === g[y + 1]?.[x]) return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setGrid(spawnTile(spawnTile(grid)));
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      const map = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT'
      };
      if (map[e.key]) move(map[e.key]);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  return (
    <GameLayout title="2048" goBack={goBack}>
      <h3>Score: {score}</h3>
      {gameOver && <h3 style={{ color: 'red' }}>Game Over</h3>}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 60px)',
          gap: '8px',
          background: '#bbada0',
          padding: '8px',
          borderRadius: '6px'
        }}>
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                style={{
                  width: '60px',
                  height: '60px',
                  background: colors[cell] || '#3c3a32',
                  color: cell <= 4 ? '#776e65' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  borderRadius: '4px'
                }}
              >
                {cell || ''}
              </div>
            ))
          )}
        </div>
      </div>

      <p style={{ marginTop: '10px' }}>Use arrow keys to play</p>
    </GameLayout>
  );
};

export default TwoZeroFourEight;
