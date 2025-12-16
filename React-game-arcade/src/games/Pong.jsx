import React, { useEffect, useRef, useState } from 'react';

const Pong = ({ goBack }) => {
  const canvasRef = useRef(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Game State
    const ball = { x: 300, y: 200, dx: 4, dy: 4, size: 10 };
    const p1 = { x: 10, y: 150, w: 10, h: 80, dy: 0, score: 0 };
    const p2 = { x: 580, y: 150, w: 10, h: 80, dy: 0, score: 0 };

    const update = () => {
      // Move Paddles
      p1.y += p1.dy;
      p2.y += p2.dy;
      if (p1.y < 0) p1.y = 0; if (p1.y + p1.h > 400) p1.y = 400 - p1.h;
      if (p2.y < 0) p2.y = 0; if (p2.y + p2.h > 400) p2.y = 400 - p2.h;

      // Move Ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall Collision (Top/Bottom)
      if (ball.y < 0 || ball.y > 400) ball.dy *= -1;

      // Paddle Collision
      if (
        (ball.x < p1.x + p1.w && ball.y > p1.y && ball.y < p1.y + p1.h) ||
        (ball.x > p2.x && ball.y > p2.y && ball.y < p2.y + p2.h)
      ) {
        ball.dx *= -1.1; // Speed up
      }

      // Scoring
      if (ball.x < 0) { p2.score++; resetBall(); }
      if (ball.x > 600) { p1.score++; resetBall(); }

      if (p1.score >= 5) { setWinner('Player 1'); cancelAnimationFrame(animationId); return; }
      if (p2.score >= 5) { setWinner('Player 2'); cancelAnimationFrame(animationId); return; }

      draw();
      animationId = requestAnimationFrame(update);
    };

    const resetBall = () => {
      ball.x = 300; ball.y = 200; ball.dx = (Math.random() > 0.5 ? 4 : -4); ball.dy = 4;
    };

    const draw = () => {
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, 600, 400);
      ctx.fillStyle = '#fff';
      ctx.fillRect(p1.x, p1.y, p1.w, p1.h);
      ctx.fillRect(p2.x, p2.y, p2.w, p2.h);
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '30px Arial';
      ctx.fillText(p1.score, 200, 50);
      ctx.fillText(p2.score, 400, 50);
      ctx.fillRect(298, 0, 4, 400); // Net
    };

    const handleKeyDown = (e) => {
      if (e.key === 'w') p1.dy = -6;
      if (e.key === 's') p1.dy = 6;
      if (e.key === 'ArrowUp') p2.dy = -6;
      if (e.key === 'ArrowDown') p2.dy = 6;
    };

    const handleKeyUp = (e) => {
      if (e.key === 'w' || e.key === 's') p1.dy = 0;
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') p2.dy = 0;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    update();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <h2>🏓 Pong</h2>
      {winner ? (
        <div><h1>{winner} Wins!</h1><button onClick={goBack}>Exit</button></div>
      ) : (
        <canvas ref={canvasRef} width={600} height={400} style={{ border: '4px solid #fff', borderRadius: '10px' }} />
      )}
      <p>P1: W/S | P2: Up/Down</p>
      <button className="back-btn" onClick={goBack}>Back</button>
    </div>
  );
};
export default Pong;