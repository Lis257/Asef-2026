import React, { useState } from 'react';

const SOSGame = ({ goBack }) => {
  const size = 6; 
  const [board, setBoard] = useState(Array(size).fill(null).map(() => Array(size).fill(null)));
  const [turn, setTurn] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [selectedLetter, setSelectedLetter] = useState('S');

  const checkSOS = (r, c, letter, currentBoard) => {
    let points = 0;
    const dirs = [[0,1], [1,0], [1,1], [1,-1]]; // Only check forward/down/diag
    // This simple logic checks centers. Full logic checks if placing letter completes any SOS.
    // For simplicity: We only check if the placed letter *completes* an SOS.
    
    // Check all 8 neighbors for patterns
    const neighbors = [
        [-1,-1], [-1,0], [-1,1],
        [0,-1],          [0,1],
        [1,-1],  [1,0],  [1,1]
    ];
    
    // If placing 'O', look for S-O-S
    if (letter === 'O') {
        if (currentBoard[r][c-1] === 'S' && currentBoard[r][c+1] === 'S') points++; // Horizontal
        if (currentBoard[r-1]?.[c] === 'S' && currentBoard[r+1]?.[c] === 'S') points++; // Vertical
        if (currentBoard[r-1]?.[c-1] === 'S' && currentBoard[r+1]?.[c+1] === 'S') points++; // Diag \
        if (currentBoard[r-1]?.[c+1] === 'S' && currentBoard[r+1]?.[c-1] === 'S') points++; // Diag /
    }
    
    // If placing 'S', look for S-O-S where this S is an end
    if (letter === 'S') {
        neighbors.forEach(([dr, dc]) => {
            if (currentBoard[r+dr]?.[c+dc] === 'O' && currentBoard[r+dr*2]?.[c+dc*2] === 'S') points++;
        });
    }
    return points;
  };

  const handleClick = (r, c) => {
    if (board[r][c]) return;
    const newBoard = [...board];
    newBoard[r] = [...board[r]];
    newBoard[r][c] = selectedLetter;
    
    const points = checkSOS(r, c, selectedLetter, newBoard);
    setBoard(newBoard);

    if (points > 0) {
        setScores(s => ({...s, [turn]: s[turn] + points }));
        // Player goes again!
    } else {
        setTurn(turn === 1 ? 2 : 1);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>🆘 SOS Game</h2>
      <div style={{display:'flex', justifyContent:'center', gap:20, marginBottom:10}}>
        <button style={{background: selectedLetter==='S'?'#0f0':'#fff', color:'black'}} onClick={()=>setSelectedLetter('S')}>Place 'S'</button>
        <button style={{background: selectedLetter==='O'?'#0f0':'#fff', color:'black'}} onClick={()=>setSelectedLetter('O')}>Place 'O'</button>
      </div>
      <div style={{marginBottom: 10}}>
          <span style={{color: turn===1?'#0ff':'#fff'}}>P1: {scores[1]}</span> vs <span style={{color: turn===2?'#f0f':'#fff'}}>P2: {scores[2]}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 40px)`, gap: 2, margin: '0 auto', width: 'fit-content' }}>
        {board.map((row, r) => row.map((cell, c) => (
          <div 
            key={`${r}-${c}`} 
            onClick={() => handleClick(r, c)}
            style={{ width: 40, height: 40, background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #555' }}
          >
            {cell}
          </div>
        )))}
      </div>
      <br/>
      <button className="back-btn" onClick={goBack}>Back</button>
    </div>
  );
};
export default SOSGame;