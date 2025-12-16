import React, { useState, useEffect } from 'react';

const MathFight = ({ goBack }) => {
  const [p1Q, setP1Q] = useState({});
  const [p2Q, setP2Q] = useState({});
  const [p1Ans, setP1Ans] = useState('');
  const [p2Ans, setP2Ans] = useState('');
  const [scores, setScores] = useState({ p1: 0, p2: 0 });

  const generateQ = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { q: `${a} + ${b}`, a: a + b };
  };

  useEffect(() => { setP1Q(generateQ()); setP2Q(generateQ()); }, []);

  const check = (player) => {
    if (player === 1) {
      if (parseInt(p1Ans) === p1Q.a) { setScores(s => ({...s, p1: s.p1 + 1})); setP1Q(generateQ()); setP1Ans(''); }
    } else {
      if (parseInt(p2Ans) === p2Q.a) { setScores(s => ({...s, p2: s.p2 + 1})); setP2Q(generateQ()); setP2Ans(''); }
    }
  };

  if (scores.p1 >= 10 || scores.p2 >= 10) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <h1>{scores.p1 >= 10 ? 'Player 1' : 'Player 2'} Wins!</h1>
        <button onClick={goBack}>Exit</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100%', color: 'black' }}>
      {[1, 2].map(p => (
        <div key={p} style={{ flex: 1, background: p === 1 ? '#ffcccc' : '#ccccff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Player {p}</h2>
          <h1>{p === 1 ? p1Q.q : p2Q.q}</h1>
          <input 
            type="number" 
            value={p === 1 ? p1Ans : p2Ans} 
            onChange={e => p === 1 ? setP1Ans(e.target.value) : setP2Ans(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && check(p)}
            style={{ fontSize: '20px', padding: 10, width: 100, textAlign: 'center' }}
            autoFocus={p === 1}
          />
          <p>Score: {p === 1 ? scores.p1 : scores.p2}/10</p>
          <small>Press Enter to submit</small>
        </div>
      ))}
      <button style={{position: 'absolute', bottom: 10, left: 10}} onClick={goBack}>Back</button>
    </div>
  );
};
export default MathFight;