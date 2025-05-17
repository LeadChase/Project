import React, { useRef, useEffect, useState } from 'react';
import { Mail, RefreshCw, Home, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Mail className="w-7 h-7" />, color: 'bg-indigo-500',
    title: 'Multi-Channel AI Engagement',
    description: 'Go beyond basic drips. Let AI qualify leads via personalized Email, SMS, and natural Voice conversations.',
    tags: [
      { label: 'Email', color: 'bg-indigo-100 text-indigo-700' },
      { label: 'SMS', color: 'bg-purple-100 text-purple-700' },
      { label: 'Voice', color: 'bg-green-100 text-green-700' },
    ]
  },
  {
    icon: <RefreshCw className="w-7 h-7" />, color: 'bg-blue-500',
    title: 'Seamless CRM Integration',
    description: 'Keep your workflow smooth. Flawless, two-way sync with Salesforce and HubSpot.',
    tags: [
      { label: 'HubSpot', color: 'bg-gray-100 text-gray-700' },
      { label: 'Connected', color: 'bg-green-100 text-green-700' },
      { label: 'Salesforce', color: 'bg-gray-100 text-gray-700' },
      { label: 'Connected', color: 'bg-green-100 text-green-700' },
    ]
  },
  {
    icon: <Home className="w-7 h-7" />, color: 'bg-green-500',
    title: 'Integrated Lead & Property Hub',
    description: 'Connect the dots instantly. Manage leads and listings in one place, with smart matching based on buyer preferences.',
    tags: [
      { label: 'Leads', color: 'bg-green-100 text-green-700' },
      { label: 'Properties', color: 'bg-teal-100 text-teal-700' },
    ]
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />, color: 'bg-yellow-500',
    title: 'Designed Exclusively for Real Estate',
    description: 'No generic bloat. An intuitive interface and features built around your daily needs as an agent.',
    tags: [
      { label: 'Listings', color: 'bg-yellow-100 text-yellow-700' },
      { label: 'Leads', color: 'bg-orange-100 text-orange-700' },
      { label: 'Follow-ups', color: 'bg-orange-100 text-orange-700' },
      { label: 'Analytics', color: 'bg-purple-100 text-purple-700' },
    ]
  },
];

export const FeatureShowcase: React.FC = () => {
  // Animation: reveal on scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewArr, setInViewArr] = useState(features.map(() => false));

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('.feature-card') ?? [];
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
    <section className="py-16 bg-transparent relative overflow-x-clip">
      {/* Soft background glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[220px] bg-indigo-300/10 rounded-full blur-3xl z-0"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Get Ready for Intelligent Automation,<br className="hidden md:block" />
            <span className="text-purple-600">Built for You:</span>
          </h2>
        </div>
        <div
          ref={containerRef}
          className="flex flex-col gap-7 md:gap-8"
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card group bg-white/95 rounded-2xl shadow-xl border border-gray-100 px-7 py-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 transition-all duration-500 hover:scale-[1.025] hover:shadow-2xl focus:scale-[1.025] focus:shadow-2xl relative ${inViewArr[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              data-step={i}
              style={{ transitionDelay: `${i * 120}ms` }}
              tabIndex={0}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${f.color} bg-opacity-90 shadow-md text-white text-2xl transition-transform duration-300 group-hover:scale-110 group-focus:scale-110`}>
                {f.icon}
              </div>
              {/* Content */}
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-lg md:text-xl mb-1">{f.title}</div>
                <div className="text-gray-700 text-base md:text-lg mb-2">{f.description}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {f.tags.map((tag, j) => (
                    <span
                      key={tag.label + j}
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all duration-300 animate-tagfade ${tag.color}`}
                      style={{ animationDelay: `${0.2 + j * 0.12}s` }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .feature-card { transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
        @keyframes tagfade {
          0% { opacity: 0; transform: translateY(12px) scale(0.9); }
          100% { opacity: 1; transform: none; }
        }
        .animate-tagfade { animation: tagfade 0.7s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </section>
  );
}; 