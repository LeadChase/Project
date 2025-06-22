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
    document.title = 'Leadchoose | CONVERT MORE LEADS INTO CLOSED DEALS WITH AI';
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (link) {
      // Assuming you placed your downloaded image (e.g., 'my-favicon.png')
      // in the 'public' folder of your project.
      // The path starts with '/' to indicate the root of your public directory.
      link.href = '/LeadChoose.png'; // <--- Change this to your image's path and name
    } else {
      // If no favicon link exists, create one
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = '/LeadChoose.png'; // <--- Change this to your image's path and name
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