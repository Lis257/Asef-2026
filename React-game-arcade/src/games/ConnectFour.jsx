import React, { useState } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const ConnectFour = ({ goBack }) => {
  const [board, setBoard] = useState(Array(6).fill(null).map(() => Array(7).fill(null)));
  const [redNext, setRedNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWin = (b, r, c, player) => {
    // Basic check logic (simplified)
    const dirs = [[0,1],[1,0],[1,1],[1,-1]];
    return dirs.some(([dr, dc]) => {
      let count = 0;
      for(let i = -3; i <= 3; i++) {
        const nr = r + i * dr, nc = c + i * dc;
        if(nr >= 0 && nr < 6 && nc >= 0 && nc < 7 && b[nr][nc] === player) count++;
        else count = 0;
        if(count >= 4) return true;
      }
      return false;
    });
  };

  const drop = (col) => {
    if(winner) return;
    const newBoard = board.map(r => [...r]);
    for(let r = 5; r >= 0; r--) {
      if(!newBoard[r][col]) {
        newBoard[r][col] = redNext ? '🔴' : '🟡';
        if(checkWin(newBoard, r, col, redNext ? '🔴' : '🟡')) setWinner(redNext ? 'Red' : 'Yellow');
        setBoard(newBoard);
        setRedNext(!redNext);
        return;
      }
    }
  };

  return (
    <GameLayout title="Connect Four" goBack={goBack}>
      <h3>{winner ? `${winner} Wins!` : `${redNext ? 'Red' : 'Yellow'}'s Turn`}</h3>
      <div style={{display:'grid', gridTemplateColumns:'repeat(7, 40px)', gap:'5px', background:'blue', padding:'10px', borderRadius:'10px'}}>
        {board.map((row, r) => row.map((cell, c) => (
          <div key={`${r}-${c}`} onClick={() => drop(c)} style={{
            width:'40px', height:'40px', background:'white', borderRadius:'50%',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'
          }}>
            {cell}
          </div>
        )))}
      </div>
      <button onClick={() => {setBoard(Array(6).fill(null).map(()=>Array(7).fill(null))); setWinner(null)}} style={{marginTop:'20px'}}>Reset</button>
    </GameLayout>
  );
};
export default ConnectFour;