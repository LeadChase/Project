import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const checklist = [
  {
    title: 'Automate Engagement 24/7:',
    description: 'Smart AI follows up via personalized Email, SMS, and Voice.'
  },
  {
    title: 'Sync Seamlessly:',
    description: 'Keep data consistent with flawless Salesforce & HubSpot integration.'
  },
  {
    title: 'Match Instantly:',
    description: 'Connect qualified buyers to the perfect properties in seconds.'
  },
  {
    title: 'Reclaim Your Time:',
    description: 'Focus on building relationships and closing deals, not chasing cold leads.'
  },
];

// S-curve path and card positions (aligned to the S)
// The S-curve is defined in SVG coordinates (0-800 width, 0-800 height)
const sCurvePoints = [
  { x: 160, y: 120, align: 'left', rotate: -7 },
  { x: 750, y: 260, align: 'right', rotate: 7 },
  { x: 120, y: 420, align: 'left', rotate: 8 },
  { x: 750, y: 550, align: 'right', rotate: -6 },
];

export const HowItWorks: React.FC = () => {
  // Animation: reveal on scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewArr, setInViewArr] = useState(checklist.map(() => false));

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('.howitworks-card') ?? [];
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).getAttribute('data-step'));
          if (entry.isIntersecting) {
            setInViewArr((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // S-shaped SVG path
  const pathD = `M 100 120
    C 300 0, 500 240, 700 260
    S 300 600, 120 500
    S 600 800, 680 670`;

  // Convert SVG coordinates to percent for absolutely positioned cards
  const svgW = 800, svgH = 800;
  const cardPositions = sCurvePoints.map((pt) => ({
    left: `calc(${(pt.x / svgW) * 100}% - 160px)`, // 160px is half card width
    top: `calc(${(pt.y / svgH) * 100}% - 48px)`,   // 48px is approx half card height
    align: pt.align,
    rotate: pt.rotate,
  }));

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            LeadChoose: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Intelligent Nurturing, Built for Agents Like You.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            We're building the simple, powerful platform you've been waiting for, designed <span className="font-semibold">specifically</span> for your Real Estate workflow.
          </p>
        </div>
        <div className="relative min-h-[800px] md:min-h-[900px]" ref={containerRef}>
          {/* Animated SVG S-shaped path */}
          <svg
            width="100%"
            height="900"
            viewBox="0 0 800 900"
            fill="none"
            className="absolute left-0 top-0 w-full h-full pointer-events-none z-0"
            style={{ filter: 'blur(0.5px)' }}
          >
            <path
              d={pathD}
              stroke="url(#howitworks-gradient)"
              strokeWidth="5"
              strokeDasharray="12 10"
              strokeLinecap="round"
              className="animate-pathpulse"
            />
            <defs>
              <linearGradient id="howitworks-gradient" x1="0" y1="0" x2="800" y2="900" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="0.5" stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#818CF8" />
              </linearGradient>
            </defs>
          </svg>
          {/* Floating cards, aligned to S-curve, alternating left/right */}
          {checklist.map((item, i) => (
            <div
              key={i}
              className={`howitworks-card absolute transition-all duration-700 group ${inViewArr[i] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'} ${cardPositions[i].align === 'left' ? 'origin-left' : 'origin-right'}`}
              data-step={i}
              style={{
                left: cardPositions[i].left,
                top: cardPositions[i].top,
                width: '320px',
                zIndex: 2,
                transform: `${inViewArr[i] ? '' : 'scale(0.9)'} rotate(${cardPositions[i].rotate}deg)` ,
                transitionDelay: `${i * 120}ms`,
                animation: inViewArr[i] ? `float${i} 4.2s ease-in-out infinite alternate` : undefined,
                textAlign: cardPositions[i].align as 'left' | 'right',
              }}
              tabIndex={0}
            >
              <div className={`relative bg-white/90 rounded-2xl shadow-xl border border-gray-100 px-6 py-5 flex items-start gap-4 hover:scale-105 hover:shadow-2xl focus:scale-105 focus:shadow-2xl transition-all duration-300 ${cardPositions[i].align === 'right' ? 'flex-row-reverse' : ''}`}>
                <span className="mt-1">
                  <CheckCircle2 className={`h-7 w-7 text-indigo-500 drop-shadow-md transition-transform duration-500 group-hover:scale-125 group-focus:scale-125 group-hover:text-purple-500 group-focus:text-purple-500 ${inViewArr[i] ? 'scale-110 animate-pop' : 'scale-75'}`} />
                </span>
                <div>
                  <div className="font-semibold text-gray-900 text-lg md:text-xl mb-1">{item.title}</div>
                  <div className="text-gray-700 text-base md:text-lg">{item.description}</div>
                </div>
              </div>
            </div>
          ))}
          {/* Path pulse and card float animation */}
          <style>{`
            @keyframes pathpulse {
              0%, 100% { stroke-opacity: 0.7; filter: blur(0.5px); }
              50% { stroke-opacity: 1; filter: blur(1.5px); }
            }
            .animate-pathpulse { animation: pathpulse 3.5s ease-in-out infinite; }
            @keyframes pop {
              0% { transform: scale(0.7); }
              60% { transform: scale(1.25); }
              100% { transform: scale(1.1); }
            }
            .animate-pop { animation: pop 0.6s cubic-bezier(.4,0,.2,1) both; }
            @keyframes float0 {
              0% { transform: rotate(-7deg) translateY(0); }
              100% { transform: rotate(-7deg) translateY(-18px); }
            }
            @keyframes float1 {
              0% { transform: rotate(7deg) translateY(0); }
              100% { transform: rotate(7deg) translateY(16px); }
            }
            @keyframes float2 {
              0% { transform: rotate(8deg) translateY(0); }
              100% { transform: rotate(8deg) translateY(-14px); }
            }
            @keyframes float3 {
              0% { transform: rotate(-6deg) translateY(0); }
              100% { transform: rotate(-6deg) translateY(20px); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};