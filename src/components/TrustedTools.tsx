import React, { useState } from 'react';

const tools = [
  {
    name: 'Gmail',
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="rotating-logo">
        <rect width="40" height="40" rx="12" fill="#fff" />
        <path d="M7 13.5V27a2.5 2.5 0 002.5 2.5h21A2.5 2.5 0 0033 27V13.5L20 23 7 13.5z" fill="#EA4335" />
        <path d="M7 13.5L20 23l13-9.5" stroke="#34A853" strokeWidth="2" />
        <path d="M7 13.5V27a2.5 2.5 0 002.5 2.5h21A2.5 2.5 0 0033 27V13.5" stroke="#4285F4" strokeWidth="2" />
        <path d="M7 13.5L20 23l13-9.5" stroke="#FBBC05" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Outlook',
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="rotating-logo">
        <rect width="40" height="40" rx="12" fill="#fff" />
        <rect x="8" y="12" width="24" height="16" rx="3" fill="#0072C6" />
        <rect x="12" y="16" width="16" height="8" rx="2" fill="#fff" />
        <rect x="12" y="16" width="8" height="8" rx="2" fill="#50A5E6" />
      </svg>
    ),
  },
  {
    name: 'Salesforce',
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="rotating-logo">
        <rect width="40" height="40" rx="12" fill="#fff" />
        <ellipse cx="20" cy="20" rx="13" ry="10" fill="#00A1E0" />
        <text x="20" y="24" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold" fontFamily="Arial">SF</text>
      </svg>
    ),
  },
  {
    name: 'HubSpot',
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="rotating-logo">
        <rect width="40" height="40" rx="12" fill="#fff" />
        <circle cx="20" cy="20" r="10" fill="#FF7A59" />
        <circle cx="20" cy="20" r="4" fill="#fff" />
        <circle cx="28" cy="14" r="2" fill="#FF7A59" />
        <rect x="19" y="10" width="2" height="8" rx="1" fill="#FF7A59" />
      </svg>
    ),
  },
];

export const TrustedTools: React.FC = () => {
  // For infinite sliding, duplicate the tools array
  const slidingTools = [...tools, ...tools];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-lg md:text-xl font-bold tracking-wide text-gray-900 mb-2 uppercase">
            <span className="text-gray-800">Works with the tools you </span>
            <span className="text-purple-600">already trust</span>
          </h2>
        </div>
        <div
          className="overflow-x-hidden w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex gap-6 md:gap-10 justify-center items-stretch w-max"
            style={{
              animation: isHovered ? undefined : 'slide-horizontal 14s linear infinite',
            }}
          >
            {slidingTools.map((tool, i) => (
              <div
                key={tool.name + i}
                className={`tool-card group bg-white/95 rounded-2xl shadow-lg border border-gray-100 px-8 py-7 flex flex-col items-center justify-center min-w-[160px] max-w-[180px] transition-all duration-500 hover:scale-105 hover:shadow-2xl focus:scale-105 focus:shadow-2xl cursor-pointer relative opacity-100 translate-y-0`}
                tabIndex={0}
              >
                <div className="mb-3 flex items-center justify-center">
                  {tool.logo}
                </div>
                <div className="font-semibold text-gray-800 text-base md:text-lg tracking-tight">
                  {tool.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slide-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .rotating-logo {
          animation: rotate360 3.5s linear infinite;
          transform-origin: 50% 50%;
        }
        @keyframes rotate360 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .tool-card { transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
      `}</style>
    </section>
  );
}; 