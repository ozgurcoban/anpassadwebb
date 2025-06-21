'use client';

import React, { useEffect, useRef } from 'react';

const FaviconGenerator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawFavicon = (canvas: HTMLCanvasElement, size: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(0.5, '#8b5cf6');
    gradient.addColorStop(1, '#ec4899');

    // Scale and center the logo
    const scale = size / 70;
    ctx.scale(scale, scale);
    ctx.translate(0, 5); // Adjust vertical centering

    // Draw the AW path
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    // A letter
    ctx.moveTo(5, 50);
    ctx.lineTo(20, 10);
    ctx.lineTo(35, 50);
    ctx.moveTo(11, 35);
    ctx.lineTo(29, 35);
    
    // W letter
    ctx.moveTo(20, 10);
    ctx.lineTo(35, 50);
    ctx.lineTo(45, 20);
    ctx.lineTo(55, 50);
    ctx.lineTo(66, 20);
    
    ctx.stroke();
  };

  const downloadFavicon = (size: number, filename: string) => {
    const canvas = document.createElement('canvas');
    drawFavicon(canvas, size);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawFavicon(canvasRef.current, 180);
    }
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">Favicon Generator</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Preview (180x180)</h3>
          <canvas 
            ref={canvasRef} 
            className="border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <button
            onClick={() => downloadFavicon(16, 'favicon-16x16.png')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Download 16x16
          </button>
          <button
            onClick={() => downloadFavicon(32, 'favicon-32x32.png')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Download 32x32
          </button>
          <button
            onClick={() => downloadFavicon(180, 'apple-touch-icon.png')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download Apple Touch Icon (180x180)
          </button>
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-600">
            Tips: 
            <br />1. Ladda ner alla storlekar
            <br />2. Placera filerna i public/ mappen
            <br />3. För .ico fil, använd en online converter med 16x16 och 32x32 PNG
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaviconGenerator;