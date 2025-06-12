import React, { useRef, useEffect, useState } from 'react'; // Import useRef, useEffect, useState

const allPainPointsTitles = [
  'Leads Ghost or Disappear',
  'Too Much Time Is Spend On Bad Leads',
  'Unqualified Leads Clog Your Pipeline',
  'Time Is Spend On Admin Not Selling',
  'Agents Overwhelmed By Unqualified Leads',
  'Leads Are Forgotten Or Neglected',
  'No Clarity On Lead Source/Contact',
  'Slow Response Times',
  'Low Conversion Despite High Volume',
  'Can\'t Remember Follow-ups/Contacts',
];

// Split the titles into two columns
const leftColumnTitles = allPainPointsTitles.slice(0, 5);
const rightColumnTitles = allPainPointsTitles.slice(5, 10);

export const PainPoints: React.FC = () => {
  // Animation: reveal on scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewArr, setInViewArr] = useState(allPainPointsTitles.map(() => false)); // Use allPainPointsTitles for state length

  useEffect(() => {
    // Select all list items directly to observe their visibility
    const nodes = containerRef.current?.querySelectorAll('.painpoint-list-item') ?? [];
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).getAttribute('data-index'));
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Reasons You Are Missing Opportunities…
          </h2>
        </div>
        
        {/* Table-like grid for the titles */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
          ref={containerRef} // Attach ref to the grid container
        >
          {/* Left Column */}
          <div>
            <ul className="list-none p-0 m-0">
              {leftColumnTitles.map((title, index) => (
                <li
                  key={`left-${index}`}
                  className={`painpoint-list-item flex items-center mb-3 transition-all duration-700 ${
                    inViewArr[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  data-index={index} // Add data-index for observation
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <span
                    className={`text-red-500 font-bold text-lg leading-none mr-2 transition-transform duration-500 ${
                      inViewArr[index] ? 'animate-pop-icon' : 'scale-0' // Apply animation class
                    }`}
                  >
                    !
                  </span>
                  <span className="text-lg text-gray-700">{title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <ul className="list-none p-0 m-0">
              {rightColumnTitles.map((title, index) => (
                <li
                  key={`right-${index}`}
                  className={`painpoint-list-item flex items-center mb-3 transition-all duration-700 ${
                    inViewArr[index + leftColumnTitles.length] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  data-index={index + leftColumnTitles.length} // Adjust index for right column
                  style={{ transitionDelay: `${(index + leftColumnTitles.length) * 80}ms` }}
                >
                  <span
                    className={`text-red-500 font-bold text-lg leading-none mr-2 transition-transform duration-500 ${
                      inViewArr[index + leftColumnTitles.length] ? 'animate-pop-icon' : 'scale-0' // Apply animation class
                    }`}
                  >
                    !
                  </span>
                  <span className="text-lg text-gray-700">{title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Added text below the table */}
      <div className="text-center mt-12 text-2xl font-bold italic text-red-800 hover:text-red-900 transition-colors duration-300">
        And a Lot More You Have Heard Yourself…
      </div>

      {/* CSS for the animation */}
      <style>{`
        @keyframes pop-icon {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-icon {
          animation: pop-icon 0.5s cubic-bezier(.4,0,.2,1) forwards;
        }
      `}</style>
    </section>
  );
};
