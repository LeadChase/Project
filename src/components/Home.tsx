import { useEffect } from 'react';
import { Hero } from './Hero.js';
import { Features } from './Features.js';
import { HowItWorks } from './HowItWorks.js';
import { Testimonials } from './Testimonials.js';
import { Pricing } from './Pricing.js';
import { Contact } from './Contact.js';
import { FeatureShowcase } from './FeatureShowcase.js';
import { TrustedTools } from './TrustedTools.js';

export function Home() {
  useEffect(() => {
    document.title = 'LeadChoose | AI-Powered Real Estate Lead Generation';
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (link) {
      link.href = 'data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><text y=\".9em\" font-size=\"90\">🏠</text></svg>';
    }
  }, []);

  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FeatureShowcase />
        <TrustedTools />
        <Pricing />
        <Contact />
      </main>
    </div>
  );
} 