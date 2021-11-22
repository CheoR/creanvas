import React, { useCallback, useEffect, useRef, useState } from 'react';

// import styles from './canvas.module.css';

export const Canvas = () => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = 'black';
      ctx.current.lineWidth = 5;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();
      ctx.current.stroke();

      setPosition({
        x,
        y,
      });
    }
  }, [lastPosition, mouseDown, setPosition]);

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY,
    });
    setMouseDown(true);
  };

  const onMouseUp = () => setMouseDown(false);

  const onMouseMove = (e) => draw(e.pageX, e.pageY);

  return (
    <canvas
      style={{
        border: '2px solid black',
      }}
      width={window.innerWidth}
      height={window.innerHeight}
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
    />
  );
};
