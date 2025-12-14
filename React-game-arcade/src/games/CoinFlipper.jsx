import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const CoinFlipper = ({ goBack }) => {
  const [result, setResult] = useState('?');
  const [flipping, setFlipping] = useState(false);

  const flip = () => {
    setFlipping(true);
    setResult('...');
    setTimeout(() => {
      setResult(Math.random() > 0.5 ? 'HEADS' : 'TAILS');
      setFlipping(false);
    }, 1000);
  };

  return (
    <GameLayout title="Coin Flipper" goBack={goBack}>
      <div style={{
        width: '100px', height: '100px', borderRadius: '50%', background: 'gold', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        fontSize: '1.2rem', fontWeight: 'bold', margin: '20px auto', border: '4px solid orange'
      }}>
        {result}
      </div>
      <button onClick={flip} disabled={flipping} style={{ padding: '10px 20px', background: '#333', color: 'white' }}>
        {flipping ? 'Flipping...' : 'Flip Coin'}
      </button>
    </GameLayout>
  );
};
export default CoinFlipper;