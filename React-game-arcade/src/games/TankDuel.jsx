import React, { useEffect, useRef, useState } from 'react';

const TankDuel = ({ goBack }) => {
  const canvasRef = useRef(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const WIDTH = 600;
    const HEIGHT = 400;
    const COOLDOWN = 400; // 0.4 second cooldown

    const p1 = {
      x: 60,
      y: HEIGHT / 2,
      color: '#00ffcc',
      keys: {},
      bullets: [],
      hp: 5,
      lastShot: 0 // Track cooldown
    };

    const p2 = {
      x: WIDTH - 60,
      y: HEIGHT / 2,
      color: '#ff4d6d',
      keys: {},
      bullets: [],
      hp: 5,
      lastShot: 0 // Track cooldown
    };

    const update = () => {
      if (winner) return;

      // P1 movement (WASD)
      if (p1.keys.w && p1.y > 20) p1.y -= 4;
      if (p1.keys.s && p1.y < HEIGHT - 20) p1.y += 4;
      if (p1.keys.a && p1.x > 20) p1.x -= 4;
      if (p1.keys.d && p1.x < WIDTH / 2 - 20) p1.x += 4;

      // P2 movement (Arrows)
      if (p2.keys.ArrowUp && p2.y > 20) p2.y -= 4;
      if (p2.keys.ArrowDown && p2.y < HEIGHT - 20) p2.y += 4;
      if (p2.keys.ArrowLeft && p2.x > WIDTH / 2 + 20) p2.x -= 4;
      if (p2.keys.ArrowRight && p2.x < WIDTH - 20) p2.x += 4;

      moveBullets();
      checkHits();
      draw();

      animationId = requestAnimationFrame(update);
    };

    const moveBullets = () => {
      p1.bullets.forEach(b => (b.x += 8));
      p2.bullets.forEach(b => (b.x -= 8));

      p1.bullets = p1.bullets.filter(b => b.x < WIDTH);
      p2.bullets = p2.bullets.filter(b => b.x > 0);
    };

    const checkHits = () => {
      p1.bullets.forEach(b => {
        if (Math.abs(b.x - p2.x) < 15 && Math.abs(b.y - p2.y) < 15) {
          p2.hp--;
          b.hit = true;
        }
      });

      p2.bullets.forEach(b => {
        if (Math.abs(b.x - p1.x) < 15 && Math.abs(b.y - p1.y) < 15) {
          p1.hp--;
          b.hit = true;
        }
      });

      p1.bullets = p1.bullets.filter(b => !b.hit);
      p2.bullets = p2.bullets.filter(b => !b.hit);

      if (p1.hp <= 0) setWinner('Player 2 Wins!');
      if (p2.hp <= 0) setWinner('Player 1 Wins!');
    };

    const draw = () => {
      ctx.fillStyle = '#0b1020';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Divider
      ctx.strokeStyle = '#333';
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(WIDTH / 2, 0);
      ctx.lineTo(WIDTH / 2, HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);

      // Tanks
      ctx.fillStyle = p1.color;
      ctx.fillRect(p1.x - 10, p1.y - 10, 20, 20);

      ctx.fillStyle = p2.color;
      ctx.fillRect(p2.x - 10, p2.y - 10, 20, 20);

      // Bullets
      ctx.fillStyle = '#fff';
      p1.bullets.forEach(b => ctx.fillRect(b.x, b.y, 6, 3));
      p2.bullets.forEach(b => ctx.fillRect(b.x, b.y, 6, 3));

      // HUD
      ctx.fillStyle = '#00ffcc';
      ctx.font = '14px Arial';
      ctx.fillText(`P1 HP: ${p1.hp}`, 20, 20);

      ctx.fillStyle = '#ff4d6d';
      ctx.fillText(`P2 HP: ${p2.hp}`, WIDTH - 90, 20);
    };

    const handleKeyDown = e => {
      p1.keys[e.key] = true;
      p2.keys[e.key] = true;

      const now = Date.now();

      // Shoot with cooldown
      if (e.key === ' ' && now - p1.lastShot > COOLDOWN) {
        p1.bullets.push({ x: p1.x + 12, y: p1.y });
        p1.lastShot = now;
      }
      if (e.key === 'Enter' && now - p2.lastShot > COOLDOWN) {
        p2.bullets.push({ x: p2.x - 12, y: p2.y });
        p2.lastShot = now;
      }
    };

    const handleKeyUp = e => {
      delete p1.keys[e.key];
      delete p2.keys[e.key];
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    update();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [winner]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}
    >
      <h2>🚀 Tank Duel</h2>
      <p>P1: WASD + SPACE | P2: Arrows + ENTER</p>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{
          background: '#0b1020',
          border: '3px solid #00ffcc',
          borderRadius: '12px',
          boxShadow: '0 0 30px rgba(0,255,204,0.4)'
        }}
      />

      {winner && <h2 style={{ marginTop: 10 }}>{winner}</h2>}

      <button className="back-btn" onClick={goBack} style={{ marginTop: 15 }}>
        Back
      </button>
    </div>
  );
};

export default TankDuel;