import React, { useState } from 'react';

const Gomoku = ({ goBack }) => {
  const size = 10; // 10x10 grid for quick games
  const [board, setBoard] = useState(Array(size).fill(null).map(() => Array(size).fill(null)));
  const [turn, setTurn] = useState('⚫'); // Black goes first
  const [winner, setWinner] = useState(null);

  const checkWin = (r, c, player) => {
    const dirs = [[1,0], [0,1], [1,1], [1,-1]];
    for (let [dr, dc] of dirs) {
      let count = 1;
      for (let i = 1; i < 5; i++) if (board[r + i*dr]?.[c + i*dc] === player) count++; else break;
      for (let i = 1; i < 5; i++) if (board[r - i*dr]?.[c - i*dc] === player) count++; else break;
      if (count >= 5) return true;
    }
    return false;
  };

  const handleClick = (r, c) => {
    if (board[r][c] || winner) return;
    const newBoard = [...board];
    newBoard[r] = [...board[r]];
    newBoard[r][c] = turn;
    setBoard(newBoard);
    
    if (checkWin(r, c, turn)) setWinner(turn);
    else setTurn(turn === '⚫' ? '⚪' : '⚫');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Gomoku (Connect 5)</h2>
      <h3>{winner ? `${winner} Wins!` : `Turn: ${turn}`}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 30px)`, gap: 1, background: '#8B4513', padding: 5, width: 'fit-content', margin: '0 auto' }}>
        {board.map((row, r) => row.map((cell, c) => (
          <div 
            key={`${r}-${c}`} 
            onClick={() => handleClick(r, c)}
            style={{ width: 30, height: 30, background: '#deb887', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', cursor: 'pointer' }}
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
export default Gomoku;