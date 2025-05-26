import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, Check } from 'lucide-react';

export const FreeSystemDemo: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    mostImportantQuestion: '', // New field
    howDidYouFindUs: '', // New field
    estimatedMonthlyLeadVolume: '', // New field
    crmSystem: '', // New field for dropdown
    leadType: '', // New field for dropdown
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        phone: '',
        mostImportantQuestion: '', // New field
        howDidYouFindUs: '', // New field
        estimatedMonthlyLeadVolume: '', // New field
        crmSystem: '', // New field for dropdown
        leadType: '', // New field for dropdown
      }));
    }, 1500);
  };

  return (
    <section id="free-marketing-analysis" className="py-32 bg-gradient-to-br from-white via-indigo-50 to-purple-50 relative overflow-x-clip">
      {/* Contact Form */}
      <div className="flex justify-center px-4"> {/* Added flex and justify-center to center the form */}
        <div className="relative bg-white/70 rounded-2xl shadow-2xl p-8 border border-gray-100 backdrop-blur-xl overflow-hidden animate-fadein max-w-2xl w-full"> {/* Increased max-w and ensured full width usage */}
          <div className="absolute -inset-1.5 rounded-3xl z-0 pointer-events-none animate-borderglow"
            style={{
              background: 'linear-gradient(120deg, #818cf8 10%, #a5b4fc 40%, #c4b5fd 70%, #818cf8 100%)',
              opacity: 0.18,
              filter: 'blur(16px)',
            }}
          />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center"> {/* Centered the heading */}
              Would you like to see the system in live action?
            </h3>
           <p className="text-lg text-gray-600 mb-2 text-center">
            <span className="font-semibold">Fill out the form below and we will contact you within 48 hours with a demo version of the system.</span>
           </p>
           <p className="text-lg text-gray-600 mb-8 text-center">
             <span className="font-semibold">No costs, no obligations, and no annoying sales pitch. Guaranteed.</span>
           </p>
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
                {/* Full Name and Email fields side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Use grid for responsive side-by-side layout */}
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
                      Email
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
                </div>

                {/* Company name and Phone number fields side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Use grid for responsive side-by-side layout */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company name
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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      required
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                      placeholder="123-456-7890"
                    />
                  </div>
                </div>
                 {/* New: What is your most important question? */}
                <div>
                  <label htmlFor="mostImportantQuestion" className="block text-sm font-medium text-gray-700 mb-1">
                    What is your most important question?
                  </label>
                  <input
                    id="mostImportantQuestion"
                    name="mostImportantQuestion"
                    type="text"
                    value={formState.mostImportantQuestion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                    placeholder="e.g., How long until I see results?"
                  />
                </div>

                {/* New: How did you find us? */}
                <div>
                  <label htmlFor="howDidYouFindUs" className="block text-sm font-medium text-gray-700 mb-1">
                    How did you find us?
                  </label>
                  <input
                    id="howDidYouFindUs"
                    name="howDidYouFindUs"
                    type="text"
                    value={formState.howDidYouFindUs}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                    placeholder="e.g., Google search, social media, referral"
                  />
                </div>

                {/* New: What is your estimated monthly lead volume? */}
                <div>
                  <label htmlFor="estimatedMonthlyLeadVolume" className="block text-sm font-medium text-gray-700 mb-1">
                    What is your estimated monthly lead volume?
                  </label>
                  <select
                    id="leadVolume"
                    name="leadVolume"
                    value={formState.leadType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                  >
                    <option value="">Select an option</option>
                    <option value="Less than hundred">Less than 100</option>
                    <option value="hundred to five hundred">100-500</option>
                    <option value="five hundred to thousand">500-1000</option>
                    <option value="thousand to two thousand five hundred">1000-2500</option>
                    <option value="two thousand five hundred to five thousand">2500-5000</option>
                    <option value="five thousand plus">5000+</option>
                  </select>
                </div>


                {/*Which CRM system do you use? (Dropdown) */}
                <div>
                  <label htmlFor="leadType" className="block text-sm font-medium text-gray-700 mb-1">
                    Which CRM system do you use?
                  </label>
                  <select
                    id="crmSystem"
                    name="crmSystem"
                    value={formState.leadType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                  >
                    <option value="">Select an option</option>
                    <option value="Real estate buyer">Real estate buyer</option>
                    <option value="Real estate seller">Real estate seller</option>
                    <option value="Real estate renter">Real estate renter</option>
                    <option value="Mortgage home refinance">Mortgage home refinance</option>
                  </select>
                </div>

                
                {/* Original single fields (Company website and Monthly Spend) */}
                {/* Note: I'm keeping the original single fields for now as they weren't part of the side-by-side request in the prompt. If you want these side-by-side too, let me know! */}
                {/* Assuming these are no longer needed based on the previous conversation, as the first image details were explicitly asked for and then changed. If needed, uncomment and adjust state. */}
                {/*
                <div>
                  <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                    What's your company website?
                  </label>
                  <input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="url"
                    value={formState.companyWebsite}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                    placeholder="e.g., www.yourcompany.com"
                  />
                </div>
                <div>
                  <label htmlFor="monthlySpend" className="block text-sm font-medium text-gray-700 mb-1">
                    How much do you spend on advertising / marketing per month?
                  </label>
                  <input
                    id="monthlySpend"
                    name="monthlySpend"
                    type="number"
                    value={formState.monthlySpend}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                    placeholder="e.g., 5000"
                  />
                </div>
                <div>
                  <label htmlFor="whatIsYourWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                    What's your website?
                  </label>
                  <input
                    id="whatIsYourWebsite"
                    name="whatIsYourWebsite"
                    type="url"
                    value={formState.whatIsYourWebsite}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]"
                    placeholder="e.g., www.yourwebsite.com"
                  />
                </div>
                */}

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
                      SEND
                      <SendIcon className="h-5 w-5 ml-2" />
                    </span>
                  )}
                </button>
              </form>
            )}
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