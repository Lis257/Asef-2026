import React, { useState, useEffect } from 'react';

const ReactionDuel = ({ goBack }) => {
  const [status, setStatus] = useState('waiting'); // waiting, ready, done
  const [winner, setWinner] = useState(null);
  
  // Random delay between 2s and 5s
  useEffect(() => {
    if (status === 'waiting') {
      const timeout = setTimeout(() => {
        setStatus('ready');
      }, 2000 + Math.random() * 3000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  useEffect(() => {
    const handleKey = (e) => {
      if (status === 'done') return;

      // P1 = A, P2 = L
      if (e.key.toLowerCase() === 'a') {
        if (status === 'waiting') { setWinner('P2 (P1 False Start!)'); setStatus('done'); }
        else { setWinner('Player 1 Wins!'); setStatus('done'); }
      }
      if (e.key.toLowerCase() === 'l') {
        if (status === 'waiting') { setWinner('P1 (P2 False Start!)'); setStatus('done'); }
        else { setWinner('Player 2 Wins!'); setStatus('done'); }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status]);

  return (
    <div style={{ 
      background: status === 'ready' ? '#00ff00' : '#cecece', 
      height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'background 0.1s' 
    }}>
      <h1 style={{ color: '#000', fontSize: '3rem' }}>
        {status === 'waiting' ? 'WAIT FOR GREEN...' : status === 'ready' ? 'PRESS NOW!' : winner}
      </h1>
      <div style={{ display: 'flex', gap: '50px', marginTop: '20px', color: '#333', fontWeight: 'bold' }}>
        <div>P1 Key: "A"</div>
        <div>P2 Key: "L"</div>
      </div>
      {status === 'done' && <button style={{ marginTop: 20 }} onClick={() => { setStatus('waiting'); setWinner(null); }}>Rematch</button>}
      <button className="back-btn" style={{marginTop: 20}} onClick={goBack}>Back</button>
    </div>
  );
};
export default ReactionDuel;