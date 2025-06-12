import { useEffect } from 'react';
import { Hero } from './Hero.js';
import { Features } from './Features.js';
import { ComesToRescue } from './ComesToRescue.js';
import { Contact } from './Contact.js';
import { FeatureShowcase } from './FeatureShowcase.js';
import { AIToolsSection } from './AIToolsSection.js';
import { TrustedTools } from './TrustedTools.js';
import {MakeDifferent} from './MakeDifferent.js'

export function Home() {
  useEffect(() => {
    document.title = 'Leadchoose | Convert more leads into closings with AI';
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (link) {
      link.href = '/LeadChoose.jpeg';
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = '/LeadChoose.jpeg';
      document.head.appendChild(newLink);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Features />
        <ComesToRescue />
        <FeatureShowcase />
        <AIToolsSection />
        <MakeDifferent />
        <TrustedTools />
        <Contact />
      </main>
    </div>
  );
} 