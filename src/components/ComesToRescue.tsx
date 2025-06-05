import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const checklist = [
  {
    title: 'Drastically increase your average real estate lead conversion.',
    description: 'More Qualified Leads'
  },
  {
    title: 'Double your ROI on lead spend just by following up with people who were already in our system.',
    description: 'Higher Answer Rate'
  },
  {
    title: 'Spend more time selling — not categorizing, managing, or chasing cold leads',
    description: 'Lower Sales Overhead'
  },
];

export const ComesToRescue: React.FC = () => {
  // Animation: reveal on scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewArr, setInViewArr] = useState(checklist.map(() => false));

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('.checklist-item') ?? []; // Changed class name
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
    <section id="comes-to-rescue" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            LeadChoose <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">Comes To Rescue</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            We use AI that follows up with every lead <span className="font-semibold">automatically by text & email or phone call </span>, qualifies them, live transfers hot leads, and updates your CRM. No lead slips through the cracks. No more time spent on lead categorization, management, or data entry. No wasted ad spend on leads that never hear back.
          </p>
        </div>
        
        {/* Checklist items */}
        <div className="space-y-8" ref={containerRef}> {/* Use space-y for vertical spacing */}
          {checklist.map((item, i) => (
            <div
              key={i}
              className={`checklist-item flex items-start bg-white/90 rounded-xl shadow-lg border border-gray-100 px-6 py-5 transition-all duration-700 ${
                inViewArr[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-step={i}
              style={{ transitionDelay: `${i * 150}ms` }} // Adjusted delay for checklist
              tabIndex={0}
            >
              <span className="flex-shrink-0 mt-1 mr-4">
                <CheckCircle2 className={`h-8 w-8 text-red-500 drop-shadow-md transition-transform duration-500 ${inViewArr[i] ? 'scale-110 animate-pop' : 'scale-75'}`} />
              </span>
              <div>
                <div className="font-semibold text-gray-900 text-xl md:text-2xl mb-1">{item.title}</div>
                <div className="text-gray-700 text-base md:text-lg">{item.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Removed SVG and its associated animations */}
        {/* Removed specific float keyframes as they are no longer needed */}

        {/* Added sentence below the section */}
      <div className="text-center mt-12 text-gray-700 text-xl font-semibold">
        Get more qualified appointments. Grow your revenue.
      </div>
        <style>{`
          @keyframes pop {
            0% { transform: scale(0.7); }
            60% { transform: scale(1.25); }
            100% { transform: scale(1.1); }
          }
          .animate-pop { animation: pop 0.6s cubic-bezier(.4,0,.2,1) both; }
        `}</style>
      </div>
    </section>
  );
};
