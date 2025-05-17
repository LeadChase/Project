import React, { useState, useRef, useEffect } from 'react';
import { Check, HelpCircle } from 'lucide-react';

interface PlanFeature {
  name: string;
  tooltip?: string;
  included: boolean | string;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  cta: string;
  popular?: boolean;
  features: PlanFeature[];
}

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const plans: PricingPlan[] = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses just getting started',
      price: billingCycle === 'monthly' ? '$49' : '$39',
      period: billingCycle === 'monthly' ? '/month' : '/month, billed annually',
      cta: 'Start Free Trial',
      features: [
        { name: 'Up to 1,000 visitors tracked', included: true },
        { name: 'Basic lead form builder', included: true },
        { name: 'Email capture popups', included: true },
        { name: 'Standard lead qualification', included: true },
        { name: 'Basic analytics dashboard', included: true },
        { name: 'Standard email notifications', included: true },
        { name: 'AI-powered lead scoring', included: false },
        { name: 'Advanced integrations', included: false },
        { name: 'Custom branding', included: false },
        { name: 'Priority support', included: false },
      ]
    },
    {
      name: 'Growth',
      description: 'For growing teams with more advanced needs',
      price: billingCycle === 'monthly' ? '$99' : '$79',
      period: billingCycle === 'monthly' ? '/month' : '/month, billed annually',
      cta: 'Start Free Trial',
      popular: true,
      features: [
        { name: 'Up to 10,000 visitors tracked', included: true },
        { name: 'Advanced form builder', included: true },
        { name: 'Smart popups & slide-ins', included: true },
        { name: 'AI lead qualification', included: true },
        { name: 'Full analytics dashboard', included: true },
        { name: 'Real-time notifications', included: true },
        { name: 'AI-powered lead scoring', included: true },
        { name: 'Advanced integrations', included: true },
        { name: 'Custom branding', included: true },
        { name: 'Priority support', included: false },
      ]
    },
    {
      name: 'Enterprise',
      description: 'For organizations with complex requirements',
      price: 'Custom',
      period: 'Contact for pricing',
      cta: 'Contact Sales',
      features: [
        { name: 'Unlimited visitors tracked', included: true },
        { name: 'Premium form builder', included: true },
        { name: 'All popup & form types', included: true },
        { name: 'Advanced AI qualification', included: true },
        { name: 'Custom analytics & reports', included: true },
        { name: 'Custom notifications', included: true },
        { name: 'Advanced AI lead scoring', included: true },
        { name: 'Premium integrations & API', included: true },
        { name: 'White labeling & branding', included: true },
        { name: 'Dedicated support manager', included: true },
      ]
    }
  ];

  // Animation: reveal on scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewArr, setInViewArr] = useState(plans.map(() => false));

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('.pricing-card') ?? [];
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
  }, [plans.length]);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-white relative overflow-x-clip">
      {/* Soft background glow */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-indigo-300/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-purple-300/20 rounded-full blur-3xl z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for your business
          </p>
          {/* Animated billing toggle */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1 rounded-full bg-gray-100 border border-gray-200 shadow-inner relative overflow-hidden w-[260px] h-10">
              <span
                className="absolute top-1 left-1 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500 z-0"
                style={{
                  width: 'calc(50% - 8px)',
                  transform: billingCycle === 'annual' ? 'translateX(100%)' : 'translateX(0%)',
                  transition: 'transform 0.5s cubic-bezier(.4,0,.2,1), background 0.5s',
                }}
              />
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`relative w-1/2 h-8 px-0 rounded-full text-sm font-medium transition-colors z-10 ${
                  billingCycle === 'monthly'
                    ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
                style={{ background: 'transparent' }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`relative w-1/2 h-8 px-0 rounded-full text-sm font-medium transition-colors flex items-center z-10 ${
                  billingCycle === 'annual'
                    ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
                style={{ background: 'transparent' }}
              >
                Annual
                <span className="ml-2 py-0.5 px-2 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                plan.popular
                  ? 'border-2 border-teal-500 shadow-2xl scale-105 z-10 bg-white/90 animate-popular-glow'
                  : 'border border-gray-200 shadow-md bg-white/80 hover:shadow-xl'
              } ${inViewArr[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              data-step={index}
              style={{ transitionDelay: `${index * 120}ms` }}
              tabIndex={0}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-teal-500 to-teal-400 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg shadow-lg animate-badgepop">
                  Most Popular
                </div>
              )}
              <div className="p-8 flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6 flex items-end justify-center gap-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 text-base">{plan.period}</span>
                </div>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white/80 p-8 border-t border-gray-200">
                <p className="font-medium text-gray-900 mb-4">Features include:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {typeof feature.included === 'boolean' ? (
                        feature.included ? (
                          <span className="inline-flex items-center justify-center h-6 w-6 mr-2">
                            <Check className="h-5 w-5 text-teal-500 animate-checkpop" />
                          </span>
                        ) : (
                          <span className="h-5 w-5 rounded-full border-2 border-gray-300 mr-2 flex-shrink-0" />
                        )
                      ) : (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 mr-2">
                          {feature.included}
                        </span>
                      )}
                      <span className="text-gray-700 flex items-center">
                        {feature.name}
                        {feature.tooltip && (
                          <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .pricing-card { transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
        @keyframes badgepop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-badgepop { animation: badgepop 0.7s cubic-bezier(.4,0,.2,1) both; }
        @keyframes checkpop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-checkpop { animation: checkpop 0.6s cubic-bezier(.4,0,.2,1) both; }
        @keyframes popular-glow {
          0%, 100% { box-shadow: 0 0 0 0 #14b8a6cc, 0 4px 32px #14b8a622; }
          50% { box-shadow: 0 0 0 8px #14b8a633, 0 8px 40px #14b8a644; }
        }
        .animate-popular-glow { animation: popular-glow 2.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
};