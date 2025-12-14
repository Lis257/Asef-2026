import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const TicTacToe = ({ goBack }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  
  const checkWinner = (squares) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let line of lines) {
      const [a,b,c] = line;
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  const winner = checkWinner(board);

  const handleClick = (i) => {
    if(board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isX ? 'X' : 'O';
    setBoard(newBoard);
    setIsX(!isX);
  };

  return (
    <GameLayout title="Tic Tac Toe" goBack={goBack}>
      <h3>{winner ? `Winner: ${winner}!` : `Player: ${isX ? 'X' : 'O'}`}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', width: '200px', margin: '0 auto' }}>
        {board.map((cell, i) => (
          <button key={i} onClick={() => handleClick(i)} style={{ height: '60px', fontSize: '1.5rem', background: '#f0f0f0', color: '#333' }}>
            {cell}
          </button>
        ))}
      </div>
      <button onClick={() => setBoard(Array(9).fill(null))} style={{ marginTop: '20px', background: '#333', color: 'white' }}>Reset</button>
    </GameLayout>
  );
};
export default TicTacToe;