import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const Snake = ({ goBack }) => {
  const [snake, setSnake] = useState([[0,0]]);
  const [food, setFood] = useState([5,5]);
  const [dir, setDir] = useState([1,0]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if(gameOver) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const newHead = [prev[0][0] + dir[0], prev[0][1] + dir[1]];
        if(newHead[0] < 0 || newHead[0] > 9 || newHead[1] < 0 || newHead[1] > 9 || prev.some(s => s[0]===newHead[0] && s[1]===newHead[1])) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [newHead, ...prev];
        if(newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood([Math.floor(Math.random()*10), Math.floor(Math.random()*10)]);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  return (
    <GameLayout title="Snake" goBack={goBack}>
      {gameOver ? <h3 style={{color:'red'}}>Game Over!</h3> : null}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', width: '200px', height: '200px', border: '1px solid #333'
      }}>
        {Array(100).fill(null).map((_, i) => {
          const x = i % 10;
          const y = Math.floor(i / 10);
          const isSnake = snake.some(s => s[0] === x && s[1] === y);
          const isFood = food[0] === x && food[1] === y;
          return <div key={i} style={{ background: isSnake ? 'green' : isFood ? 'red' : '#fff' }}></div>
        })}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setDir([0, -1])}>⬆️</button><br/>
        <button onClick={() => setDir([-1, 0])}>⬅️</button>
        <button onClick={() => setDir([1, 0])}>➡️</button><br/>
        <button onClick={() => setDir([0, 1])}>⬇️</button>
      </div>
    </GameLayout>
  );
};
export default Snake;