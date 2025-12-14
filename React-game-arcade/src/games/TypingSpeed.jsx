import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const words = ["react", "javascript", "arcade", "coding", "component", "state", "effect", "variable"];

const TypingSpeed = ({ goBack }) => {
  const [target, setTarget] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => setTarget(words[Math.floor(Math.random() * words.length)]), []);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    if(val === target) {
      setScore(s => s + 1);
      setInput('');
      setTarget(words[Math.floor(Math.random() * words.length)]);
    }
  };

  return (
    <GameLayout title="Typing Speed" goBack={goBack}>
      <h3>Score: {score}</h3>
      <h2 style={{letterSpacing:'2px', fontSize:'2rem'}}>{target}</h2>
      <input type="text" value={input} onChange={handleChange} autoFocus style={{padding:'10px', fontSize:'1.2rem', textAlign:'center'}} />
    </GameLayout>
  );
};
export default TypingSpeed;