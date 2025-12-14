import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const TugOfWar = ({ goBack }) => {
  const [pos, setPos] = useState(50); // 0 = P1 win, 100 = P2 win
  const [winner, setWinner] = useState(null);

  const pull = (dir) => {
    if(winner) return;
    const newPos = pos + dir;
    if(newPos <= 0) setWinner('Player 1');
    else if(newPos >= 100) setWinner('Player 2');
    else setPos(newPos);
  };

  return (
    <GameLayout title="Tug Of War" goBack={goBack}>
      {winner ? <h2>🏆 {winner} Wins!</h2> : <p>P1: Press 'A' | P2: Press 'L' (or click)</p>}
      
      <div style={{width:'300px', height:'40px', border:'2px solid #333', margin:'20px', position:'relative', borderRadius:'20px', overflow:'hidden'}}>
        <div style={{
          width: '50%', height: '100%', background: pos < 50 ? 'red' : 'blue',
          position: 'absolute', left: `${pos - 25}%`, transition: 'all 0.1s'
        }}></div>
        <div style={{position:'absolute', left:'50%', top:0, bottom:0, width:'2px', background:'black'}}></div>
      </div>

      <div style={{display:'flex', gap:'50px'}}>
        <button onClick={() => pull(-5)} style={{background:'red', padding:'20px'}}>P1 PULL</button>
        <button onClick={() => pull(5)} style={{background:'blue', padding:'20px'}}>P2 PULL</button>
      </div>
    </GameLayout>
  );
};
export default TugOfWar;