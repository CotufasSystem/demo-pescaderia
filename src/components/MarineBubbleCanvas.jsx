import React, { useEffect, useRef } from 'react';

export default function MarineBubbleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Burbujas ambientales
    const ambientBubbles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 4 + 1.5,
      speedY: Math.random() * 0.8 + 0.3,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
      wobbleAmp: Math.random() * 1.5 + 0.5,
      wobbleOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.15
    }));

    // Burbujas dinámicas generadas por el cursor
    const cursorBubbles = [];
    let mousePos = { x: -100, y: -100 };
    let lastSpawn = 0;

    const handleMouseMove = (e) => {
      mousePos = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      if (now - lastSpawn > 35) {
        // Generar 1 a 2 microburbujas en el trayecto del ratón
        const count = Math.random() > 0.4 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          cursorBubbles.push({
            x: e.clientX + (Math.random() - 0.5) * 16,
            y: e.clientY + (Math.random() - 0.5) * 16,
            radius: Math.random() * 5 + 2,
            speedY: Math.random() * 1.6 + 0.8,
            speedX: (Math.random() - 0.5) * 0.9,
            opacity: 0.85,
            growth: 0.04
          });
        }
        lastSpawn = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dibujar ambiente
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.5)';
      ctx.lineWidth = 1;

      ambientBubbles.forEach((b) => {
        b.y -= b.speedY;
        b.wobbleOffset += b.wobbleSpeed;
        const currentX = b.x + Math.sin(b.wobbleOffset) * b.wobbleAmp;

        if (b.y < -10) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(currentX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${b.opacity})`;
        ctx.fill();
        ctx.stroke();

        // Brillo interior de la burbuja
        ctx.beginPath();
        ctx.arc(currentX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 1.2})`;
        ctx.fill();
      });

      // Dibujar burbujas del cursor
      for (let i = cursorBubbles.length - 1; i >= 0; i--) {
        const cb = cursorBubbles[i];
        cb.y -= cb.speedY;
        cb.x += cb.speedX;
        cb.opacity -= 0.016;
        cb.radius += cb.growth;

        if (cb.opacity <= 0) {
          cursorBubbles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(cb.x, cb.y, Math.max(0.5, cb.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${cb.opacity * 0.35})`;
        ctx.strokeStyle = `rgba(165, 243, 252, ${cb.opacity * 0.75})`;
        ctx.lineWidth = 1.2;
        ctx.fill();
        ctx.stroke();

        // Reflejo de luz blanca
        ctx.beginPath();
        ctx.arc(cb.x - cb.radius * 0.3, cb.y - cb.radius * 0.3, Math.max(0.5, cb.radius * 0.25), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${cb.opacity * 0.9})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-300"
    />
  );
}
