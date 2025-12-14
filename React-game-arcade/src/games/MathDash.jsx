import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout.jsx';

const MathDash = ({ goBack }) => {
  const [q, setQ] = useState({a:0, b:0, op:'+'});
  const [ans, setAns] = useState('');
  const [score, setScore] = useState(0);

  const gen = () => {
    const ops = ['+','-','*'];
    const op = ops[Math.floor(Math.random()*3)];
    const a = Math.floor(Math.random()*10)+1;
    const b = Math.floor(Math.random()*10)+1;
    setQ({a, b, op});
    setAns('');
  };

  useEffect(gen, []);

  const check = (e) => {
    e.preventDefault();
    let res = 0;
    if(q.op==='+') res = q.a+q.b;
    if(q.op==='-') res = q.a-q.b;
    if(q.op==='*') res = q.a*q.b;
    
    if(parseInt(ans) === res) {
      setScore(score + 1);
      gen();
    } else {
      setScore(0);
      alert('Wrong! Game Over.');
      gen();
    }
  };

  return (
    <GameLayout title="Math Dash" goBack={goBack}>
      <h3>Score: {score}</h3>
      <div style={{fontSize:'3rem', margin:'20px'}}>{q.a} {q.op} {q.b} = ?</div>
      <form onSubmit={check}>
        <input type="number" value={ans} onChange={e=>setAns(e.target.value)} autoFocus style={{fontSize:'1.5rem', width:'100px'}} />
        <button type="submit">Submit</button>
      </form>
    </GameLayout>
  );
};
export default MathDash;