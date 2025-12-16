import React, { useState } from 'react';

const NimGame = ({ goBack }) => {
  // 4 rows of matches
  const [piles, setPiles] = useState([1, 3, 5, 7]);
  const [turn, setTurn] = useState(1);
  
  const take = (pileIdx, amount) => {
    if (amount < 1) return;
    const newPiles = [...piles];
    newPiles[pileIdx] -= amount;
    setPiles(newPiles);
    // Check win condition (he who takes last loses OR wins depending on rule. Normal play: last one wins)
    if (newPiles.every(p => p === 0)) {
        alert(`Player ${turn} Wins!`);
        goBack();
    } else {
        setTurn(turn === 1 ? 2 : 1);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>🔥 Game of Nim</h2>
      <p>Player {turn}'s Turn</p>
      <p style={{ fontSize: '0.8rem' }}>Rules: Select a row, take as many as you want. Take the last item to WIN.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 20 }}>
        {piles.map((count, i) => (
          <div key={i} style={{ display: 'flex', gap: 5 }}>
            {Array.from({ length: count }).map((_, j) => (
               <div key={j} style={{ width: 10, height: 40, background: 'orange', borderRadius: 2 }}></div>
            ))}
            {count > 0 && (
                <div style={{ marginLeft: 10 }}>
                    {[1, 2, 3].map(num => (
                        num <= count && <button key={num} onClick={() => take(i, num)} style={{margin: '0 2px'}}>Take {num}</button>
                    ))}
                    <button onClick={() => take(i, count)} style={{margin: '0 2px'}}>All</button>
                </div>
            )}
          </div>
        ))}
      </div>
      <br/><br/>
      <button className="back-btn" onClick={goBack}>Back</button>
    </div>
  );
};
export default NimGame;