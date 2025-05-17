import React, { useRef, useEffect, useState } from 'react';
import { 
  Brain, 
  BarChartBig, 
  Users, 
  MessageSquareQuote, 
  Zap, 
  Bot, 
  LineChart,
  Shield
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  isLast: boolean;
  inView: boolean;
}

const FeatureStep: React.FC<FeatureProps> = ({ icon, title, description, step, isLast, inView }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative flex items-start group transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} `}
      style={{ transitionDelay: `${step * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Timeline indicator */}
      <div className="flex flex-col items-center mr-6">
        <div className="relative z-10">
          <div
            className={`w-6 h-6 rounded-full border-4 ${hovered ? 'border-indigo-500 shadow-indigo-300/40' : 'border-indigo-400'} bg-white shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-125 ${hovered ? 'scale-125 shadow-lg' : ''}`}
            style={{ boxShadow: hovered ? '0 0 0 6px #a5b4fc33' : undefined }}
          >
            <span className={`text-xs font-bold ${hovered ? 'text-indigo-700' : 'text-indigo-600'} transition-colors`}>{step}</span>
          </div>
        </div>
        {/* Connecting line */}
        {!isLast && (
          <div className="w-1 h-full bg-gradient-to-b from-indigo-300 to-purple-200 opacity-70 mt-1 mb-1 animate-growline" style={{ minHeight: 48 }} />
        )}
      </div>
      {/* Card */}
      <div className="flex-1 mb-8">
        <div
          className={`bg-white/90 rounded-xl shadow-lg border border-gray-100 px-6 py-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 focus-within:shadow-2xl focus-within:-translate-y-2 ${hovered ? 'ring-2 ring-indigo-200' : ''}`}
        >
          <div className="flex items-center mb-2">
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mr-4 text-indigo-600 text-2xl transition-transform duration-300 ${hovered ? 'rotate-[18deg] scale-110 shadow-lg' : ''}`}
              style={{ boxShadow: hovered ? '0 4px 24px #a5b4fc33' : undefined }}
            >
              {icon}
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 text-base md:text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Brain className="h-7 w-7" />,
      title: 'AI-Powered Lead Scoring',
      description: 'Automatically score and prioritize leads based on engagement and conversion likelihood.'
    },
    {
      icon: <BarChartBig className="h-7 w-7" />,
      title: 'Conversion Analytics',
      description: 'Get detailed insights into your conversion funnel with powerful visualization tools.'
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: 'Audience Segmentation',
      description: 'Segment your leads based on behavior, demographics, and engagement patterns.'
    },
    {
      icon: <MessageSquareQuote className="h-7 w-7" />,
      title: 'Smart Chat Automation',
      description: 'Engage visitors with intelligent chat that qualifies leads while you sleep.'
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: 'Fast Implementation',
      description: 'Set up in minutes with our code-free integration and start generating leads instantly.'
    },
    {
      icon: <Bot className="h-7 w-7" />,
      title: 'Custom AI Agents',
      description: 'Create personalized AI agents that match your brand voice and sales approach.'
    },
    {
      icon: <LineChart className="h-7 w-7" />,
      title: 'Performance Tracking',
      description: 'Monitor and optimize your lead generation performance in real-time.'
    },
    {
      icon: <Shield className="h-7 w-7" />,
      title: 'GDPR Compliance',
      description: 'Built-in compliance tools to ensure your lead generation meets privacy standards.'
    },
  ];

  // Intersection Observer for scroll-based reveal
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewArr, setInViewArr] = useState(features.map(() => false));

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('.feature-step') ?? [];
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
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Lead Generation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to capture, qualify, and convert more leads
          </p>
        </div>
        <div className="relative">
          {/* Vertical timeline line (background) */}
          <div className="absolute left-2.5 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 to-purple-100 rounded-full opacity-60" style={{ zIndex: 0 }} />
          <div className="flex flex-col relative z-10" ref={containerRef}>
            {features.map((feature, index) => (
              <div
                className="feature-step"
                data-step={index}
                key={index}
                tabIndex={0}
                style={{ outline: 'none' }}
              >
                <FeatureStep
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  step={index + 1}
                  isLast={index === features.length - 1}
                  inView={inViewArr[index]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        .feature-step { transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
        @keyframes growline {
          from { height: 0; }
          to { height: 100%; }
        }
        .animate-growline { animation: growline 1.2s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </section>
  );
};