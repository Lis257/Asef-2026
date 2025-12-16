import React, { useState } from 'react';

const DiceRace = ({ goBack }) => {
  const [p1Pos, setP1Pos] = useState(0);
  const [p2Pos, setP2Pos] = useState(0);
  const [turn, setTurn] = useState(1);
  const [lastRoll, setLastRoll] = useState(null);

  const roll = () => {
    const r = Math.floor(Math.random() * 6) + 1;
    setLastRoll(r);
    if (turn === 1) {
        if (p1Pos + r >= 50) setP1Pos(50);
        else setP1Pos(p1Pos + r);
        setTurn(2);
    } else {
        if (p2Pos + r >= 50) setP2Pos(50);
        else setP2Pos(p2Pos + r);
        setTurn(1);
    }
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <h2>🎲 Dice Race to 50</h2>
      
      {p1Pos === 50 || p2Pos === 50 ? (
        <div>
            <h1>{p1Pos === 50 ? 'Player 1' : 'Player 2'} Wins!</h1>
            <button onClick={goBack}>Exit</button>
        </div>
      ) : (
        <>
            <div style={{ fontSize: '4rem', margin: 20 }}>{lastRoll || '?'}</div>
            <button onClick={roll} style={{ fontSize: '1.5rem', padding: '10px 30px' }}>
                Player {turn} Roll!
            </button>
        </>
      )}

      <div style={{ marginTop: 40, textAlign: 'left' }}>
        <p>P1</p>
        <div style={{ background: '#333', height: 30, borderRadius: 15, position: 'relative' }}>
            <div style={{ width: `${p1Pos * 2}%`, background: '#0ff', height: '100%', borderRadius: 15, transition: 'width 0.3s' }}></div>
        </div>
        <p>P2</p>
        <div style={{ background: '#333', height: 30, borderRadius: 15, position: 'relative' }}>
            <div style={{ width: `${p2Pos * 2}%`, background: '#f0f', height: '100%', borderRadius: 15, transition: 'width 0.3s' }}></div>
        </div>
      </div>
      <br/><br/>
      <button className="back-btn" onClick={goBack}>Back</button>
    </div>
  );
};
export default DiceRace;