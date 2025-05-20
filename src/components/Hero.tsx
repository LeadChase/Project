import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { RealEstateBackground } from './RealEstateBackground.js';

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitStatus(Math.random() > 0.15 ? 'success' : 'error');
    
    if (Math.random() > 0.15) {
      setEmail('');
    }
    
    // Clear success message after 6 seconds
    if (submitStatus === 'success') {
      setTimeout(() => {
        setSubmitStatus(null);
      }, 6000);
    }
  };

  return (
    <div className="relative w-full pt-32 pb-32 md:pt-36 md:pb-36 flex flex-col items-center overflow-hidden bg-gradient-to-b from-indigo-50 via-purple-50 to-white">
      {/* Interactive Real Estate Animated Background */}
      <RealEstateBackground />
      {/* More vibrant gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/40 via-purple-100/30 to-transparent z-0"></div>
      
      {/* Enhanced Gradient Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-violet-300/20 rounded-full blur-3xl transform -translate-y-1/4"></div>
      
      {/* Small decorative elements */}
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-indigo-500/40 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-purple-500/40 rounded-full blur-xl"></div>
      
      {/* Content Container - Increased z-index to appear above background */}
      <div className="relative z-10 w-full max-w-[1140px] mx-auto px-5 sm:px-6 flex flex-col items-center">
        {/* Logo Icon at top - Reduced in size */}
        <div className="mb-14 md:mb-16 relative">
          <div className="absolute inset-0 bg-indigo-100 rounded-full transform scale-125 shadow-md"></div>
          <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full">
            <Zap className="w-6 h-6 md:w-7 md:h-7 text-indigo-600" />
          </div>
        </div>
        
        {/* Main Heading - Refined spacing and responsive sizes */}
        <div className="max-w-[800px] mx-auto text-center mb-16">
          <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.25rem] font-bold text-gray-900 mb-6 md:mb-8 leading-[1.1] md:leading-[1.15] tracking-tight">
            Transform Your Lead<br className="hidden sm:block" />
            Management with<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI-Powered</span> Automation
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-4">
            LeadFlow helps real estate agents <span className="font-medium">nurture leads automatically</span> across Email, 
            SMS & Voice. Focus on what matters most — <span className="font-medium">closing deals</span>.
          </p>
        </div>
        
        {/* Email Signup Form - Refined input and button sizing */}
        <div className="w-full max-w-[480px] mt-2 px-4 sm:px-0">
          <div className="bg-white/90 rounded-[22px] shadow-lg p-4 sm:p-5 backdrop-blur-sm border border-white/70">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 min-w-0 px-4 py-2.5 text-sm sm:text-base rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm sm:text-base transition-all hover:shadow-md hover:shadow-indigo-500/30 disabled:opacity-70 transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 mx-auto rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  ) : (
                    "Get Early Access"
                  )}
                </button>
              </div>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="text-sm text-green-600 text-center py-1">
                  You're on the list! We'll be in touch soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-sm text-red-600 text-center py-1">
                  Oops! Something went wrong. Please try again.
                </div>
              )}
              
              <div className="text-xs text-gray-500 text-center pt-2">
                Be the first to know. No spam, ever.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};