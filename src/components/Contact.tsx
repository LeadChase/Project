import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, Check, CheckCircle2 } from 'lucide-react'; // Added Gift, Lightbulb, Edit icons

const benefits = [
  {
    title: 'LIFETIME 50% Off: Get 50% off for life as a founding user.',
    float: 'float0',
  },
  {
    title: 'FREE Beta Access: Use LeadChoose completely free during our initial launch',
    float: 'float1',
  },
  {
    title: 'SHAPE The System: Being on the waitlist allows you to directly influence the features we build next with your feedback.',
    float: 'float2',
  },
];

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
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
        phone: ''
      }));
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-white via-red-50 to-rose-50 relative overflow-x-clip">
      {/* Soft background glow */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-red-300/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-rose-300/20 rounded-full blur-3xl z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={sectionRef}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}>
          {/* Benefits */}
          <div className="space-y-8">
            <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">Join the Waitlist & Lock In Lifetime Benefits</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              <span className="font-semibold">Get early access & all the benefits before we close the list.</span>
            </p>
            <div className="flex flex-col gap-7">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className={`relative bg-white rounded-2xl shadow-xl border border-gray-100 px-6 py-5 flex items-center gap-4 animate-float ${b.float}`} /* Changed bg-white/80 to bg-white */
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
    
                  <span className="flex-shrink-0 mt-1 mr-4">
                <CheckCircle2 className={`h-8 w-8 text-red-500 drop-shadow-md transition-transform duration-500`} />
              </span>
                  <div>
                    <div className="font-semibold text-gray-900 text-xl md:text-2xl mb-1">{b.title}</div>
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
                  background: 'linear-gradient(120deg, #ef4444 10%, #f43f5e 40%, #fb7185 70%, #ef4444 100%)',
                  opacity: 0.18,
                  filter: 'blur(16px)',
                }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Enter Your Email Below To Join The LeadChoose Waitlist.
                </h3>
                <p className="text-xl text-gray-600 mb-8">
                  <span className="font-semibold">An Automation System That Helps Agents Turn More Raw Leads Into Appointments and Closings.</span>
                </p>
                {formState.submitted ? (
                  <div className="text-center p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank You for Joining!</h4>
                    <p className="text-gray-600">We'll be in touch soon with your exclusive access.</p>
                  </div>
                ) : (
                  <div className="waitlist-form-container glassmorphism" data-appear="slide-up" data-delay="0.2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={formState.loading}
                        className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium text-lg shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          Join the waitlist and save 50%
                          <SendIcon className="h-5 w-5 ml-2" />
                        </span>
                        )}
                      </button>
                    </form>
                    {formState.submitted && (
                      <div
                        className={`mt-4 p-4 rounded-md ${
                          formState.submitted ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                        }`}
                      >
                        {formState.submitted ? 'Thank you for joining the waitlist!' : 'There was an error submitting the form.'}
                      </div>
                    )}
                  </div>
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