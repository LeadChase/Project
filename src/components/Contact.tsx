import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, Check } from 'lucide-react';

const benefits = [
  {
    icon: (
      <svg className="h-7 w-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Be the First',
    desc: 'Get exclusive early access before anyone else.',
    float: 'float0',
  },
  {
    icon: (
      <svg className="h-7 w-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'FREE Beta Access',
    desc: 'Use LeadFlow completely free during our initial launch.',
    float: 'float1',
  },
  {
    icon: (
      <svg className="h-7 w-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'LIFETIME 50% Discount',
    desc: 'Secure half-price access FOREVER as a founding user.',
    float: 'float2',
  },
];

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    submitted: false,
    loading: false
  });

  // Animation: reveal on scroll
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    setTimeout(() => {
      setFormState(prev => ({
        ...prev,
        loading: false,
        submitted: true,
        name: '',
        email: '',
        company: '',
        message: ''
      }));
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-white via-indigo-50 to-purple-50 relative overflow-x-clip">
      {/* Soft background glow */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-indigo-300/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-purple-300/20 rounded-full blur-3xl z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={sectionRef}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}>
          {/* Benefits */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Don't Miss Out – Revolutionize Your Real Estate Business
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Enter your email below to join the exclusive LeadFlow waitlist. Be the first to experience automated nurturing designed for agents.
            </p>
            <div className="flex flex-col gap-7">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className={`relative bg-white/80 rounded-2xl shadow-xl border border-gray-100 px-6 py-5 flex items-center gap-4 animate-float ${b.float}`}
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center flex-shrink-0 shadow-md">
                    {b.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg mb-1">{b.title}</div>
                    <div className="text-gray-600 text-base">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Contact Form */}
          <div>
            <div className="relative bg-white/70 rounded-2xl shadow-2xl p-8 border border-gray-100 backdrop-blur-xl overflow-hidden animate-fadein">
              <div className="absolute -inset-1.5 rounded-3xl z-0 pointer-events-none animate-borderglow"
                style={{
                  background: 'linear-gradient(120deg, #818cf8 10%, #a5b4fc 40%, #c4b5fd 70%, #818cf8 100%)',
                  opacity: 0.18,
                  filter: 'blur(16px)',
                }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Request a Demo
                </h3>
                {formState.submitted ? (
                  <div className="text-center py-10 animate-fadein">
                    <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6 animate-pop">
                      <Check className="h-8 w-8 text-teal-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h4>
                    <p className="text-gray-600">
                      We've received your request and will be in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Work Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                        placeholder="Company Inc."
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        How can we help you?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                        placeholder="Tell us about your lead generation needs..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formState.loading}
                      className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium transition-all 
                        ${formState.loading 
                          ? 'opacity-80 cursor-not-allowed' 
                          : 'hover:shadow-lg hover:from-teal-600 hover:to-teal-700 scale-[1.03]'} flex items-center justify-center`}
                    >
                      {formState.loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Request Demo
                          <SendIcon className="h-5 w-5 ml-2" />
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .animate-fadein { animation: fadein 0.8s cubic-bezier(.4,0,.2,1) both; }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes borderglow {
          0% { filter: blur(16px) brightness(1.1); }
          50% { filter: blur(8px) brightness(1.25); }
          100% { filter: blur(16px) brightness(1.1); }
        }
        .animate-borderglow { animation: borderglow 3.5s ease-in-out infinite; }
        @keyframes pop {
          0% { transform: scale(0.7); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-pop { animation: pop 0.6s cubic-bezier(.4,0,.2,1) both; }
        @keyframes float0 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-12px); }
        }
        @keyframes float1 {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        @keyframes float2 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }
        .float0 { animation: float0 3.2s ease-in-out infinite alternate; }
        .float1 { animation: float1 3.7s ease-in-out infinite alternate; }
        .float2 { animation: float2 3.1s ease-in-out infinite alternate; }
      `}</style>
    </section>
  );
};