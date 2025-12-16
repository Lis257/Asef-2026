import React, { useEffect, useRef, useState } from 'react';

const TronDuel = ({ goBack }) => {
  const canvasRef = useRef(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const scale = 5;
    const w = 600 / scale;
    const h = 400 / scale;
    let frameId;

    // Grid to track taken spots: 0=empty, 1=taken
    const grid = new Array(w * h).fill(0);

    const p1 = { x: 10, y: h/2, dx: 1, dy: 0, color: '#00ffff', dead: false };
    const p2 = { x: w - 10, y: h/2, dx: -1, dy: 0, color: '#ff00ff', dead: false };

    const update = () => {
      [p1, p2].forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        
        // Check collision with walls
        if (p.x < 0 || p.x >= w || p.y < 0 || p.y >= h) p.dead = true;
        // Check collision with trails
        else if (grid[p.y * w + p.x] === 1) p.dead = true;
        
        // Mark grid
        if (!p.dead) grid[p.y * w + p.x] = 1;
      });

      if (p1.dead || p2.dead) {
        if (p1.dead && p2.dead) setWinner('Draw!');
        else if (p1.dead) setWinner('Player 2 Wins!');
        else setWinner('Player 1 Wins!');
        return;
      }

      draw();
      setTimeout(() => { frameId = requestAnimationFrame(update); }, 1000/30); // 30 FPS
    };

    const draw = () => {
      // Draw just the heads (trails persist in grid, but we redraw canvas for simplicity or optimal performance, 
      // here we just draw rects over previous frame to keep trails)
      // Actually simpler: redraw whole grid? No, too slow. Just draw heads on top of existing canvas.
      
      // Init clear only once
      if (grid.every(v => v === 0)) {
         ctx.fillStyle = '#000';
         ctx.fillRect(0, 0, 600, 400);
      }
      
      ctx.fillStyle = p1.color;
      ctx.fillRect(p1.x * scale, p1.y * scale, scale, scale);
      
      ctx.fillStyle = p2.color;
      ctx.fillRect(p2.x * scale, p2.y * scale, scale, scale);
    };

    const handleKey = (e) => {
      const key = e.key;
      // P1
      if (key === 'w' && p1.dy !== 1) { p1.dx = 0; p1.dy = -1; }
      if (key === 's' && p1.dy !== -1) { p1.dx = 0; p1.dy = 1; }
      if (key === 'a' && p1.dx !== 1) { p1.dx = -1; p1.dy = 0; }
      if (key === 'd' && p1.dx !== -1) { p1.dx = 1; p1.dy = 0; }
      // P2
      if (key === 'ArrowUp' && p2.dy !== 1) { p2.dx = 0; p2.dy = -1; }
      if (key === 'ArrowDown' && p2.dy !== -1) { p2.dx = 0; p2.dy = 1; }
      if (key === 'ArrowLeft' && p2.dx !== 1) { p2.dx = -1; p2.dy = 0; }
      if (key === 'ArrowRight' && p2.dx !== -1) { p2.dx = 1; p2.dy = 0; }
    };

    window.addEventListener('keydown', handleKey);
    // Initial clear
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 600, 400);
    update();

    return () => {
      window.removeEventListener('keydown', handleKey);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <h2>🏍️ Tron Duel</h2>
      {winner ? <h1>{winner}</h1> : <canvas ref={canvasRef} width={600} height={400} style={{ border: '2px solid #333' }} />}
      <p>P1: Cyan (WASD) | P2: Magenta (Arrows)</p>
      <button className="back-btn" onClick={goBack}>Back</button>
    </div>
  );
};
export default TronDuel;