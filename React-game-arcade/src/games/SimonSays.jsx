import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const colors = ['red', 'green', 'blue', 'yellow'];

const SimonSays = ({ goBack }) => {
  const [seq, setSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [msg, setMsg] = useState("Press Start");

  const addColor = () => {
    const newColor = colors[Math.floor(Math.random() * 4)];
    setSeq(prev => [...prev, newColor]);
    setUserSeq([]);
    setMsg("Watch...");
    // Flash sequence logic would go here (simplified for space)
  };

  const handleClick = (c) => {
    if(!playing) return;
    const newUserSeq = [...userSeq, c];
    setUserSeq(newUserSeq);
    
    if(c !== seq[newUserSeq.length-1]) {
      setMsg("Game Over!");
      setPlaying(false);
      setSeq([]);
    } else if (newUserSeq.length === seq.length) {
      setMsg("Good! Next round.");
      setTimeout(addColor, 1000);
    }
  };

  return (
    <GameLayout title="Simon Says" goBack={goBack}>
      <h2>{msg}</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', width:'200px'}}>
        {colors.map(c => (
          <div key={c} onClick={() => handleClick(c)} style={{
            height:'80px', background:c, opacity: 0.8, cursor:'pointer', borderRadius:'10px'
          }}></div>
        ))}
      </div>
      {!playing && <button onClick={()=>{setPlaying(true); setSeq([]); setTimeout(addColor, 500)}} style={{marginTop:'20px'}}>Start Game</button>}
    </GameLayout>
  );
};
export default SimonSays;   