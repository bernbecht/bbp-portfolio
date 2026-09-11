"use client";

import { useEffect, useRef } from "react";

export default function DotFieldExperiment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const draw = (width: number, height: number) => {
      context.fillStyle = "#0a0a0a";
      context.fillRect(0, 0, width, height);
    };

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      canvas.width = Math.floor(width);
      canvas.height = Math.floor(height);

      draw(width, height);
    });

    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="overflow-hidden border border-inverse-border bg-inverse">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-72 w-full sm:h-98"
      ></canvas>
    </div>
  );
}
