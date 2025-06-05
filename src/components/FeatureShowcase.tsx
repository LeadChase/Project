import React, { useRef, useEffect, useState } from 'react';
import { Mail, Target, PhoneCall, HeartHandshake, Link } from 'lucide-react'; // Updated imports for new icons

const features = [
  {
    icon: <Mail className="w-7 h-7" />, color: 'bg-indigo-500',
    title: 'Lead Intake / Engagement Begins',
    description: 'AI texts, calls, and emails your leads. This happens immediately after a lead is captured.',
    tags: [
      { label: 'Email', color: 'bg-indigo-100 text-indigo-700' },
      { label: 'SMS', color: 'bg-red-100 text-red-700' },
      { label: 'Call', color: 'bg-green-100 text-green-700' },
    ]
  },
  {
    icon: <Target className="w-7 h-7" />, color: 'bg-blue-500', // Changed icon to Target
    title: 'Qualification Starts',
    description: 'AI calls and qualifies your leads, transferring the most valuable to you. Lead qualifying conversation. AI determines if the lead is worth pursuing.',
    tags: [
      { label: 'Qualified', color: 'bg-blue-100 text-blue-700' },
      { label: 'Hot Leads', color: 'bg-red-100 text-red-700' },
      { label: 'Unqualified', color: 'bg-gray-100 text-gray-700' },
    ]
  },
  {
    icon: <PhoneCall className="w-7 h-7" />, color: 'bg-green-500', // Changed icon to PhoneCall
    title: 'Appointments and Live Transfers',
    description: 'Appointment setting. Live call transfers with qualified leads. AI either schedules an appointment or connects to a human agent.',
    tags: [
      { label: 'Appointments Setter', color: 'bg-green-100 text-green-700' },
      { label: 'Live Calls', color: 'bg-teal-100 text-teal-700' },
    ]
  },
  {
    icon: <HeartHandshake className="w-7 h-7" />, color: 'bg-yellow-500',
    title: 'Long-Term Nurture for Cold Leads',
    description: 'Long term drip campaigns. Automated rescheduling based on lead\'s timeline. If a lead isn\'t ready now, AI keeps engaging them for months.',
    tags: [
      { label: 'Drip Campaigns', color: 'bg-yellow-100 text-yellow-700' },
      { label: 'Follow-ups', color: 'bg-orange-100 text-orange-700' },
      { label: 'Re-engagement', color: 'bg-rose-100 text-rose-700' },
    ]
  },
  {
    icon: <Link className="w-7 h-7" />, color: 'bg-yellow-500',
    title: 'CRM Logging and Syncing',
    description: 'Integrated with your CRM. Realtime notifications and data syncing. All actions, messages, and outcomes are logged automatically.',
    tags: [
      { label: 'CRM Updated', color: 'bg-yellow-100 text-yellow-700' },
      { label: 'Data Sync', color: 'bg-orange-100 text-orange-700' },
      { label: 'HubSpot', color: 'bg-gray-100 text-gray-700' },
      { label: 'Salesforce', color: 'bg-gray-100 text-gray-700' },
    ]
  },
];

export const FeatureShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewArr, setInViewArr] = useState<boolean[]>(new Array(features.length).fill(false));

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
  }, [features.length]);

  return (
    <section id="how-it-works" className="py-16 bg-transparent relative overflow-x-clip">
      {/* Soft background glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[220px] bg-red-300/10 rounded-full blur-3xl z-0"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Here Is <span className="text-red-600">How It Works</span>
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
                <ul className="list-none p-0 m-0 text-gray-700 text-base md:text-lg">
                  {f.description.split('. ').filter(Boolean).map((line, lineIndex) => (
                    <li
                      key={`${f.title}-${lineIndex}`}
                      className={`flex items-start mb-1 transition-all duration-500 ${
                        inViewArr[i] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                      style={{ transitionDelay: `${i * 120 + lineIndex * 50}ms` }}
                    >
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-red-400 mt-2 mr-2"></span>
                      {line.trim() + (lineIndex < f.description.split('. ').filter(Boolean).length - 1 ? '.' : '')}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
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