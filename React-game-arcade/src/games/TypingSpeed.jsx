import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const words = [
  // basic
  "react", "javascript", "coding", "arcade", "component", "state", "effect",
  "variable", "function", "object", "array", "string", "boolean",

  // medium
  "frontend", "backend", "database", "algorithm", "developer",
  "framework", "library", "interface", "performance", "responsive",

  // harder
  "asynchronous", "destructuring", "optimization", "implementation",
  "architecture", "authentication", "virtualization", "dependency"
];

const GAME_TIME = 30; // seconds

const TypingSpeed = ({ goBack }) => {
  const [target, setTarget] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setTarget(words[Math.floor(Math.random() * words.length)]);
  }, []);

  // countdown timer
  useEffect(() => {
    if (!running) return;

    if (timeLeft === 0) {
      setRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, timeLeft]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);

    if (val === target) {
      setScore(s => s + 1);
      setInput('');
      setTarget(words[Math.floor(Math.random() * words.length)]);
    }
  };

  const startGame = () => {
    setScore(0);
    setInput('');
    setTimeLeft(GAME_TIME);
    setRunning(true);
    setTarget(words[Math.floor(Math.random() * words.length)]);
  };

  return (
    <GameLayout title="Typing Speed" goBack={goBack}>
      <h3>Score: {score}</h3>
      <h4>Time: {timeLeft}s</h4>

      {running && (
        <>
          <h2
            style={{
              letterSpacing: '2px',
              fontSize: '2rem',
              marginBottom: '15px'
            }}
          >
            {target}
          </h2>

          <input
            type="text"
            value={input}
            onChange={handleChange}
            autoFocus
            style={{
              padding: '12px',
              fontSize: '1.2rem',
              textAlign: 'center',
              borderRadius: '6px',
              border: input && !target.startsWith(input) ? '2px solid red' : '2px solid #ccc'
            }}
          />
        </>
      )}

      {!running && timeLeft === GAME_TIME && (
        <button onClick={startGame}>Start Game</button>
      )}

      {!running && timeLeft === 0 && (
        <>
          <h2 style={{ color: '#4caf50' }}>Time's Up!</h2>
          <p>
            Final Score: <strong>{score}</strong> words
          </p>
          <button onClick={startGame} style={{ marginRight: '10px' }}>
            Play Again
          </button>
          <button onClick={goBack}>⬅ Go Back</button>
        </>
      )}
    </GameLayout>
  );
};

export default TypingSpeed;
