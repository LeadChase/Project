import React, { useEffect, useRef, useState } from 'react';

const MOTIF_COUNT = 20;

// Helper to generate random color from a palette
const palette = [
  '#6366F1', // indigo
  '#8B5CF6', // purple
  '#F59E42', // orange
  '#10B981', // green
  '#818CF8', // blue
  '#FBBF24', // yellow
  '#F3F4F6', // gray
];

// Minimal real estate motif SVGs (line art, more visible)
const motifs = [
  // House outline
  (size: number, color: string, opacity: number, bold = false) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <polyline points="8,22 20,10 32,22" stroke={color} strokeWidth={bold ? '4' : '2.5'} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} />
      <rect x="13" y="22" width="14" height="10" rx="2" stroke={color} strokeWidth={bold ? '3' : '2'} opacity={opacity} />
    </svg>
  ),
  // Key outline
  (size: number, color: string, opacity: number, bold = false) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="15" cy="25" r="7" stroke={color} strokeWidth={bold ? '4' : '2.5'} opacity={opacity} />
      <rect x="22" y="23" width="10" height="4" rx="2" stroke={color} strokeWidth={bold ? '3' : '2'} opacity={opacity} />
      <rect x="30" y="21" width="2" height="8" rx="1" stroke={color} strokeWidth={bold ? '3' : '2'} opacity={opacity} />
    </svg>
  ),
  // Location pin outline
  (size: number, color: string, opacity: number, bold = false) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="16" rx="8" ry="9" stroke={color} strokeWidth={bold ? '4' : '2.5'} opacity={opacity} />
      <ellipse cx="20" cy="16" rx="3.5" ry="4" stroke={color} strokeWidth={bold ? '3' : '2'} opacity={opacity} />
      <rect x="18" y="25" width="4" height="10" rx="2" stroke={color} strokeWidth={bold ? '3' : '2'} opacity={opacity} />
    </svg>
  ),
  // Building outline
  (size: number, color: string, opacity: number, bold = false) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="10" y="14" width="20" height="16" rx="2" stroke={color} strokeWidth={bold ? '4' : '2.5'} opacity={opacity} />
      <rect x="15" y="18" width="3" height="4" stroke={color} strokeWidth={bold ? '3' : '2'} opacity={opacity} />
      <rect x="22" y="18" width="3" height="4" stroke={color} strokeWidth={bold ? '3' : '2'} opacity={opacity} />
      <rect x="15" y="25" width="3" height="4" stroke={color} strokeWidth={bold ? '3' : '2'} opacity={opacity} />
      <rect x="22" y="25" width="3" height="4" stroke={color} strokeWidth={bold ? '3' : '2'} opacity={opacity} />
    </svg>
  ),
];

function randomScatter(min: number, max: number) {
  // More random scatter, avoid clustering in center
  return min + (max - min) * (Math.random() ** 1.2);
}

function randomMotif(i: number) {
  const motifType = i % motifs.length;
  const color = palette[(i + 2) % palette.length];
  const opacity = 0.38 + Math.random() * 0.18;
  const size = 90 + Math.random() * 180;
  const blur = 0.5 + Math.random() * 2.5;
  return {
    motifType,
    color,
    opacity,
    size,
    blur,
    x: randomScatter(0, 100),
    y: randomScatter(0, 100),
    dx: (Math.random() - 0.5) * 0.08,
    dy: (Math.random() - 0.5) * 0.08,
    scale: 0.7 + Math.random() * 1.3,
    dScale: (Math.random() - 0.5) * 0.003,
    rotate: Math.random() * 360,
    dRotate: (Math.random() - 0.5) * 0.11,
    phase: Math.random() * Math.PI * 2,
    pulse: Math.random() < 0.2,
    pulsePhase: Math.random() * Math.PI * 2,
  };
}

// Add a few large, central, gently pulsing motifs
const centralMotifs = [
  { motifType: 0, color: palette[0], opacity: 0.44, size: 320, blur: 0, x: 50, y: 38, scale: 1, rotate: 0, pulse: true, pulsePhase: 0 },
  { motifType: 3, color: palette[1], opacity: 0.34, size: 220, blur: 0, x: 70, y: 60, scale: 1, rotate: 0, pulse: true, pulsePhase: Math.PI / 2 },
];

export const RealEstateBackground: React.FC = () => {
  const motifsArr = useRef(Array.from({ length: MOTIF_COUNT }, (_, i) => randomMotif(i)));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      const now = Date.now();
      motifsArr.current = motifsArr.current.map((motif, i) => {
        let { x, y, dx, dy, scale, dScale, rotate, dRotate, phase, pulse, pulsePhase } = motif;
        x += dx;
        y += dy;
        if (x < -20) x = 120;
        if (x > 120) x = -20;
        if (y < -20) y = 120;
        if (y > 120) y = -20;
        scale += Math.sin(phase + now / (2200 + i * 120)) * dScale;
        rotate += dRotate;
        // Pulse effect
        if (pulse) {
          scale *= 1 + 0.08 * Math.sin(pulsePhase + now / 900);
        }
        return { ...motif, x, y, scale, rotate };
      });
      setTick(t => t + 1);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Gradient overlay for extra depth
  const gradientOverlay = (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 60% 40%, #a5b4fc33 0%, #f3e8ff22 60%, transparent 100%)',
        mixBlendMode: 'lighten',
      }}
    />
  );

  return (
    <div
      aria-hidden
      className="absolute inset-0 w-full h-full z-0"
      style={{ overflow: 'hidden', pointerEvents: 'none' }}
    >
      {/* Real estate motifs */}
      {motifsArr.current.map((motif, i) => {
        const { motifType, color, opacity, size, blur, x, y, scale, rotate, pulse } = motif;
        // Pulse effect for some motifs
        const pulseScale = pulse ? 1 + 0.08 * Math.sin(Date.now() / 900) : 1;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(${x}vw - ${size / 2}px)` ,
              top: `calc(${y}vh - ${size / 2}px)` ,
              width: size,
              height: size,
              opacity,
              filter: `blur(${blur}px)` ,
              transform: `scale(${scale * pulseScale}) rotate(${rotate}deg)` ,
              zIndex: 1,
              transition: 'opacity 0.3s, filter 0.3s, transform 0.3s',
              pointerEvents: 'none',
            }}
          >
            {motifs[motifType](size, color, opacity)}
          </div>
        );
      })}
      {/* Central, large, gently pulsing motifs */}
      {centralMotifs.map((motif, i) => {
        const pulseScale = 1 + 0.10 * Math.sin(Date.now() / 1200 + i);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(${motif.x}vw - ${motif.size / 2}px)` ,
              top: `calc(${motif.y}vh - ${motif.size / 2}px)` ,
              width: motif.size,
              height: motif.size,
              opacity: motif.opacity,
              filter: `blur(${motif.blur}px)` ,
              transform: `scale(${motif.scale * pulseScale}) rotate(${motif.rotate}deg)` ,
              zIndex: 2,
              transition: 'opacity 0.3s, filter 0.3s, transform 0.3s',
              pointerEvents: 'none',
            }}
          >
            {motifs[motif.motifType](motif.size, motif.color, motif.opacity, true)}
          </div>
        );
      })}
      {/* Gradient overlay */}
      {gradientOverlay}
    </div>
  );
};