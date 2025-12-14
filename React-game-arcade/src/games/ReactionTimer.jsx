import React, { useState, useRef } from 'react';
import GameLayout from '../components/GameLayout';

const ReactionTimer = ({ goBack }) => {
  const [state, setState] = useState('idle'); // idle, waiting, ready, result
  const [time, setTime] = useState(null);
  const startRef = useRef(null);
  const timeoutRef = useRef(null);

  const start = () => {
    setState('waiting');
    setTime(null);
    timeoutRef.current = setTimeout(() => {
      setState('ready');
      startRef.current = Date.now();
    }, 2000 + Math.random() * 2000);
  };

  const click = () => {
    if(state === 'waiting') {
      clearTimeout(timeoutRef.current);
      setState('idle');
      alert("Too early!");
    } else if (state === 'ready') {
      setTime(Date.now() - startRef.current);
      setState('result');
    }
  };

  return (
    <GameLayout title="Reaction Timer" goBack={goBack}>
      <div onClick={click} style={{
        width: '100%', height: '200px', background: state === 'ready' ? '#4caf50' : '#e53935',
        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', cursor: 'pointer', borderRadius: '10px'
      }}>
        {state === 'idle' && "Click Start"}
        {state === 'waiting' && "Wait for Green..."}
        {state === 'ready' && "CLICK NOW!"}
        {state === 'result' && `${time} ms`}
      </div>
      {state === 'idle' || state === 'result' ? <button onClick={start} style={{marginTop: '10px'}}>Start</button> : null}
    </GameLayout>
  );
};
export default ReactionTimer;