import React from 'react';

const GameLayout = ({ title, children, goBack }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: '#242424', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', color: '#333', padding: '2rem', borderRadius: '15px',
        maxWidth: '500px', width: '90%', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <button onClick={goBack} style={{ padding: '5px 10px', background: '#eee', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{title}</h2>
          <div style={{ width: '50px' }}></div> {/* Spacer for centering */}
        </div>
        
        <div style={{ width: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameLayout;