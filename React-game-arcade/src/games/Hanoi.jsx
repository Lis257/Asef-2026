import React, { useState } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const Hanoi = ({ goBack }) => {
  const [towers, setTowers] = useState([[3, 2, 1], [], []]);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);

  const handleTowerClick = (idx) => {
    if (selected === null) {
      if (towers[idx].length > 0) setSelected(idx);
      return;
    }

    const from = selected;
    const to = idx;
    const disk = towers[from][towers[from].length - 1];
    const target = towers[to][towers[to].length - 1];

    if (!target || target > disk) {
      const newTowers = towers.map(t => [...t]);
      newTowers[from].pop();
      newTowers[to].push(disk);
      setTowers(newTowers);
      setMoves(m => m + 1);
    }

    setSelected(null);
  };

  const hasWon = towers[2].length === 3;

  return (
    <GameLayout title="Tower of Hanoi" goBack={goBack}>
      <p>
        Move all disks from the <strong>left tower</strong> to the <strong>right tower</strong>.
      </p>
      <p><strong>Moves:</strong> {moves}</p>
      {hasWon && <h3 style={{ color: 'green' }}>Puzzle Solved! 🎉</h3>}

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '60px',
        alignItems: 'flex-end',
        height: '180px',
        marginTop: '20px'
      }}>
        {towers.map((tower, i) => (
          <div
            key={i}
            onClick={() => handleTowerClick(i)}
            style={{
              width: '80px',
              height: '150px',
              background: selected === i ? '#eee' : '#ddd',
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              justifyContent: 'flex-start',
              cursor: 'pointer',
              borderRadius: '6px',
              position: 'relative',
              paddingBottom: '10px'
            }}
          >
            {/* Rod */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              width: '6px',
              height: '120px',
              background: '#888',
              borderRadius: '3px'
            }} />

            {/* Disks */}
            {tower.map((disk, di) => (
              <div
                key={di}
                style={{
                  width: `${disk * 25}px`,
                  height: '20px',
                  background: '#646cff',
                  marginBottom: '4px',
                  borderRadius: '10px',
                  zIndex: 1
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <p style={{ marginTop: '15px' }}>
        {selected === null
          ? 'Click a tower to pick up its top disk'
          : 'Click another tower to place the disk'}
      </p>
    </GameLayout>
  );
};

export default Hanoi;
