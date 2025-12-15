import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const SIZE = 10;

const Snake = ({ goBack }) => {
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([5, 5]);
  const [dir, setDir] = useState([1, 0]);
  const [gameOver, setGameOver] = useState(false);

  const spawnFood = (snakeBody) => {
    let pos;
    do {
      pos = [
        Math.floor(Math.random() * SIZE),
        Math.floor(Math.random() * SIZE)
      ];
    } while (snakeBody.some(s => s[0] === pos[0] && s[1] === pos[1]));
    return pos;
  };

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake(prev => {
        const newHead = [prev[0][0] + dir[0], prev[0][1] + dir[1]];

        // Wall or self collision
        if (
          newHead[0] < 0 || newHead[0] >= SIZE ||
          newHead[1] < 0 || newHead[1] >= SIZE ||
          prev.some(s => s[0] === newHead[0] && s[1] === newHead[1])
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(spawnFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  const changeDir = (newDir) => {
    // Prevent reversing direction
    if (dir[0] + newDir[0] === 0 && dir[1] + newDir[1] === 0) return;
    setDir(newDir);
  };

  return (
    <GameLayout title="Snake" goBack={goBack}>
      {gameOver && <h3 style={{ color: 'red' }}>Game Over!</h3>}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
          width: '200px',
          height: '200px',
          border: '1px solid #333'
        }}>
          {Array(SIZE * SIZE).fill(null).map((_, i) => {
            const x = i % SIZE;
            const y = Math.floor(i / SIZE);
            const isSnake = snake.some(s => s[0] === x && s[1] === y);
            const isFood = food[0] === x && food[1] === y;

            return (
              <div
                key={i}
                style={{
                  background: isSnake ? 'green' : isFood ? 'red' : '#fff'
                }}
              />
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <button onClick={() => changeDir([0, -1])} disabled={gameOver}>⬆️</button><br />
        <button onClick={() => changeDir([-1, 0])} disabled={gameOver}>⬅️</button>
        <button onClick={() => changeDir([1, 0])} disabled={gameOver}>➡️</button><br />
        <button onClick={() => changeDir([0, 1])} disabled={gameOver}>⬇️</button>
      </div>
    </GameLayout>
  );
};

export default Snake;
