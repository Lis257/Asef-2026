import React, { useState } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const Hanoi = ({ goBack }) => {
  const [towers, setTowers] = useState([[3, 2, 1], [], []]);
  const [selected, setSelected] = useState(null);

  const handleTowerClick = (idx) => {
    if (selected === null) {
      if (towers[idx].length > 0) setSelected(idx);
    } else {
      const moveDisk = towers[selected][towers[selected].length - 1];
      const targetTower = towers[idx];
      
      if (targetTower.length === 0 || targetTower[targetTower.length - 1] > moveDisk) {
        const newTowers = [...towers.map(t => [...t])];
        newTowers[selected].pop();
        newTowers[idx].push(moveDisk);
        setTowers(newTowers);
      }
      setSelected(null);
    }
  };

  return (
    <GameLayout title="Tower of Hanoi" goBack={goBack}>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-end', height: '150px' }}>
        {towers.map((tower, i) => (
          <div key={i} onClick={() => handleTowerClick(i)} style={{
            width: '60px', height: '120px', background: selected === i ? '#eee' : '#ddd',
            display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', cursor: 'pointer', borderRadius: '5px'
          }}>
            {tower.map((disk, di) => (
              <div key={di} style={{
                width: `${disk * 20}px`, height: '20px', background: '#646cff',
                marginBottom: '2px', borderRadius: '10px'
              }} />
            ))}
            <div style={{ width: '4px', height: '100%', background: '#888', position: 'absolute', zIndex: -1 }} />
          </div>
        ))}
      </div>
      <p>{selected !== null ? "Selecting Tower..." : "Pick a tower"}</p>
    </GameLayout>
  );
};
export default Hanoi;