import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const choices = ['✊', '✋', '✌️'];

const RockPaperScissors = ({ goBack }) => {
  const [mode, setMode] = useState('cpu'); // 'cpu' | '2p'
  const [result, setResult] = useState('Choose your weapon!');
  const [p1Choice, setP1Choice] = useState(null);

  const decideWinner = (a, b) => {
    if (a === b) return 'Draw!';
    if (
      (a === '✊' && b === '✌️') ||
      (a === '✋' && b === '✊') ||
      (a === '✌️' && b === '✋')
    ) return 'Player 1 Wins!';
    return 'Player 2 Wins!';
  };

  // CPU MODE
  const playCPU = (choice) => {
    const cpu = choices[Math.floor(Math.random() * 3)];
    if (choice === cpu) setResult(`Draw! Both chose ${cpu}`);
    else if (
      (choice === '✊' && cpu === '✌️') ||
      (choice === '✋' && cpu === '✊') ||
      (choice === '✌️' && cpu === '✋')
    )
      setResult(`You Win! ${choice} beats ${cpu}`);
    else setResult(`You Lose! ${cpu} beats ${choice}`);
  };

  // 2 PLAYER MODE
  const play2P = (choice) => {
    if (!p1Choice) {
      setP1Choice(choice);
      setResult('Player 2: Choose!');
    } else {
      const outcome = decideWinner(p1Choice, choice);
      setResult(`${outcome} (${p1Choice} vs ${choice})`);
      setP1Choice(null);
    }
  };

  const reset = () => {
    setResult('Choose your weapon!');
    setP1Choice(null);
  };

  return (
    <GameLayout title="Rock Paper Scissors" goBack={goBack}>
      {/* Mode Switch */}
      <div style={{ marginBottom: '15px' }}>
        <button onClick={() => { setMode('cpu'); reset(); }}>
          VS CPU
        </button>
        <button onClick={() => { setMode('2p'); reset(); }} style={{ marginLeft: '10px' }}>
          2 Players
        </button>
      </div>

      <h3 style={{ minHeight: '40px' }}>
        {mode === '2p' && p1Choice ? 'Player 2 Turn' : result}
      </h3>

      <div style={{ fontSize: '3rem', cursor: 'pointer' }}>
        {choices.map(c => (
          <span
            key={c}
            onClick={() => mode === 'cpu' ? playCPU(c) : play2P(c)}
            style={{ margin: '10px' }}
          >
            {c}
          </span>
        ))}
      </div>

      {mode === '2p' && (
        <p style={{ marginTop: '10px' }}>
          {p1Choice ? 'Player 2, pick now!' : 'Player 1, pick first'}
        </p>
      )}
    </GameLayout>
  );
};

export default RockPaperScissors;
