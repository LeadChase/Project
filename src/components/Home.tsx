import { useEffect } from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';
import { Pricing } from './Pricing';
import { Contact } from './Contact';
import { FeatureShowcase } from './FeatureShowcase';
import { TrustedTools } from './TrustedTools';

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