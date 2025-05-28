import React, { useRef, useEffect, useState } from 'react';
import { Award, User, Clock, Zap } from 'lucide-react'; // Importing appropriate icons

const differentiators = [
  {
    icon: <Award className="w-7 h-7" />,
    color: 'bg-green-500',
    title: 'Guarantee',
    description: 'This is not just a simple autoresponder that we have all probably experienced by now and hated. We follow up, respond back, have full qualifying conversations, and hand off the hot leads. We guarantee two-way humanlike conversations, not static scripts.',
  },
  {
    icon: <User className="w-7 h-7" />,
    color: 'bg-blue-500',
    title: 'Personal Approach',
    description: 'We are not tucked away in some anonymous call center. We\'re a local company, so you\'ll be able to reach us when you need us. This means direct focus, custom work, and quick responses.',
  },
  {
    icon: <Clock className="w-7 h-7" />,
    color: 'bg-yellow-500',
    title: 'Speed',
    description: 'No more waiting to get your question answered with a slow support ticket. We are available 24/7 to answer any question and solve every problem, so you’re never left alone with an issue that might slow down your work.',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    color: 'bg-purple-500',
    title: 'Specialization',
    description: 'Jack of all trades... Master of none. Specialization works. That\'s why we work with the industry we know, so we can guarantee results.',
  },
];

export const MakeDifferent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewArr, setInViewArr] = useState(differentiators.map(() => false));

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('.differentiator-card') ?? [];
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
    <section className="py-16 bg-gray-50" id="differentiators">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            OK... But What Makes You Different?
          </h2>
        </div>
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8"
        >
          {differentiators.map((item, i) => (
            <div
              key={item.title}
              className={`differentiator-card group bg-white/95 rounded-2xl shadow-xl border border-gray-100 px-7 py-6 flex flex-col items-start gap-4 transition-all duration-500 hover:scale-[1.025] hover:shadow-2xl focus:scale-[1.025] focus:shadow-2xl relative ${inViewArr[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              data-step={i}
              style={{ transitionDelay: `${i * 120}ms` }}
              tabIndex={0}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${item.color} bg-opacity-90 shadow-md text-white text-2xl transition-transform duration-300 group-hover:scale-110 group-focus:scale-110`}>
                {item.icon}
              </div>
              {/* Content */}
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-lg md:text-xl mb-1">{item.title}</div>
                <p className="text-gray-700 text-base md:text-lg">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .differentiator-card { transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
      `}</style>
    </section>
  );
};
