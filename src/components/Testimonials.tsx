import React, { useRef, useEffect, useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  image: string;
  badge?: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "LeadChoose completely transformed our lead generation process. We're seeing 3x more qualified leads and our sales team can finally focus on closing instead of prospecting.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      badge: "Top Agent"
    },
    {
      id: 2,
      content: "We implemented LeadChoose six months ago and have already seen a 42% increase in conversion rates. The analytics dashboard makes it easy to track and optimize performance.",
      author: "Michael Chen",
      role: "CEO",
      company: "GrowthLabs",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      badge: "Verified"
    },
    {
      id: 3,
      content: "The AI-powered lead scoring has been a game-changer for our sales team. We're now able to focus on the most promising opportunities and close deals faster.",
      author: "Emily Rodriguez",
      role: "Sales Manager",
      company: "InnovateTech",
      rating: 5,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      badge: "5 Stars"
    }
  ];

  // Animation: reveal on scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewArr, setInViewArr] = useState(testimonials.map(() => false));

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('.testimonial-card') ?? [];
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
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-red-50 via-rose-50 to-white relative overflow-x-clip">
      {/* Soft background glow */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-indigo-300/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-red-300/20 rounded-full blur-3xl z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real estate professionals and industry leaders
          </p>
        </div>
        <div
          ref={containerRef}
          className="flex flex-col md:flex-row gap-8 md:gap-6 justify-center items-stretch"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`testimonial-card group flex-1 bg-white/90 rounded-2xl shadow-xl border border-gray-100 px-6 py-8 flex flex-col items-center text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl focus:scale-105 focus:shadow-2xl cursor-pointer relative ${inViewArr[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              data-step={i}
              style={{ transitionDelay: `${i * 120}ms` }}
              tabIndex={0}
            >
              {/* Avatar and badge */}
              <div className="relative mb-4">
                <img
                  src={t.image}
                  alt={t.author}
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 shadow-md mx-auto mb-2"
                />
                {t.badge && (
                  <span className="absolute -bottom-2 -right-2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-badgepop">
                    <CheckCircle2 className="inline-block w-4 h-4 mr-1 -mt-1" />{t.badge}
                  </span>
                )}
              </div>
              {/* Rating */}
              <div className="flex mb-3 justify-center">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`h-5 w-5 ${j < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              {/* Content */}
              <blockquote className="text-lg md:text-xl font-medium text-gray-800 mb-5 leading-relaxed">
                “{t.content}”
              </blockquote>
              {/* Author */}
              <div className="mb-1 text-indigo-700 font-semibold text-lg">{t.author}</div>
              <div className="text-gray-500 text-sm mb-2">{t.role}, {t.company}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .testimonial-card { transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
        @keyframes badgepop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-badgepop { animation: badgepop 0.7s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </section>
  );
};