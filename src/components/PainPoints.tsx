import React, { useRef, useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const painPoints = [
  {
    time: '9:00 AM',
    title: 'Morning Follow-ups',
    description: 'Starting your day with endless manual follow-ups on leads that go nowhere.'
  },
  {
    time: '11:30 AM',
    title: 'Missed Hot Lead',
    description: 'Another hot lead slips through the cracks due to delayed responses.'
  },
  {
    time: '2:00 PM',
    title: 'Data Management Chaos',
    description: 'Wasting hours juggling between spreadsheets, CRM, and property lists.'
  },
  {
    time: '4:30 PM',
    title: 'Missed Connections',
    description: 'Perfect listing for a buyer found too late - they\'ve already made an offer elsewhere.'
  },
  {
    time: '6:00 PM',
    title: 'End-of-Day Frustration',
    description: 'Reviewing generic autoresponder messages that failed to engage prospects.'
  },
];

export const PainPoints: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewArr, setInViewArr] = useState(painPoints.map(() => false));

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('.painpoint-step') ?? [];
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

  return (
    <section className="py-20 bg-white" id="pain-points">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sound Familiar? You&apos;re Losing Hours (and Deals) To...
          </h2>
        </div>
        <div className="relative">
          {/* Vertical timeline line (background) */}
          <div className="absolute left-2.5 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-200 to-indigo-100 rounded-full opacity-60" style={{ zIndex: 0 }} />
          <div className="flex flex-col relative z-10" ref={containerRef}>
            {painPoints.map((point, index) => (
              <div
                className={`painpoint-step flex items-start group transition-all duration-700 ${inViewArr[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                data-step={index}
                key={index}
                tabIndex={0}
                style={{ outline: 'none', transitionDelay: `${index * 120}ms` }}
              >
                {/* Timeline indicator */}
                <div className="flex flex-col items-center mr-6">
                  <div className="relative z-10">
                    <div className="w-6 h-6 rounded-full border-4 border-purple-400 bg-white shadow-md flex items-center justify-center">
                      <Clock className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-medium">{point.time}</div>
                  </div>
                  {/* Connecting line */}
                  {index !== painPoints.length - 1 && (
                    <div className="w-1 h-full bg-gradient-to-b from-purple-200 to-indigo-100 opacity-70 mt-1 mb-1 animate-growline" style={{ minHeight: 48 }} />
                  )}
                </div>
                {/* Card */}
                <div className="flex-1 mb-8">
                  <div className="bg-white/90 rounded-xl shadow-lg border border-gray-100 px-6 py-5">
                    <div className="font-bold text-gray-900 text-lg mb-1">{point.title}</div>
                    <div className="text-gray-600 text-base">{point.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .painpoint-step { transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
        @keyframes growline {
          from { height: 0; }
          to { height: 100%; }
        }
        .animate-growline { animation: growline 1.2s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </section>
  );
}; 