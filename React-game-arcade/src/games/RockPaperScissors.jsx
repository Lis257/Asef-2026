import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const RockPaperScissors = ({ goBack }) => {
  const [result, setResult] = useState("Choose your weapon!");
  
  const play = (choice) => {
    const opts = ['✊', '✋', '✌️'];
    const cpu = opts[Math.floor(Math.random() * 3)];
    if (choice === cpu) setResult(`Draw! Both chose ${cpu}`);
    else if ((choice === '✊' && cpu === '✌️') || (choice === '✋' && cpu === '✊') || (choice === '✌️' && cpu === '✋')) 
      setResult(`You Win! ${choice} beats ${cpu}`);
    else setResult(`You Lose! ${cpu} beats ${choice}`);
  };

  return (
    <GameLayout title="Rock Paper Scissors" goBack={goBack}>
      <h3 style={{ minHeight: '40px' }}>{result}</h3>
      <div style={{ fontSize: '3rem', cursor: 'pointer' }}>
        <span onClick={() => play('✊')} style={{ margin: '10px' }}>✊</span>
        <span onClick={() => play('✋')} style={{ margin: '10px' }}>✋</span>
        <span onClick={() => play('✌️')} style={{ margin: '10px' }}>✌️</span>
      </div>
    </GameLayout>
  );
};
export default RockPaperScissors;