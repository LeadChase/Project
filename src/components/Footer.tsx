import React, { useRef, useEffect, useState } from 'react';
import { Logo } from './Logo.js';
import {
  Heart,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube
} from 'lucide-react';

export const Footer: React.FC = () => {
  // Animation: reveal on scroll
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="relative pt-20 pb-8 bg-transparent overflow-x-clip">
      {/* Animated gradient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[320px] bg-gradient-to-tr from-red-400/20 via-rose-400/20 to-teal-300/20 rounded-full blur-3xl z-0 animate-footerGlow" />
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={sectionRef}>
        {/* Top row: logo + socials */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-8 md:gap-0">
          <div className="flex items-center gap-6">
            <Logo />
          </div>
          <div className="flex space-x-3 mt-2 md:mt-0">
            {[{
              icon: <Twitter className="h-5 w-5" />, href: '#'
            }, {
              icon: <Facebook className="h-5 w-5" />, href: '#'
            }, {
              icon: <Instagram className="h-5 w-5" />, href: '#'
            }, {
              icon: <Linkedin className="h-5 w-5" />, href: '#'
            }, {
              icon: <Youtube className="h-5 w-5" />, href: '#'
            }].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="group bg-white/60 backdrop-blur-md rounded-full p-2 shadow-md transition-all duration-300 hover:bg-gradient-to-tr hover:from-red-400/30 hover:to-rose-400/30 hover:scale-110"
                tabIndex={0}
              >
                <span className="text-gray-500 group-hover:text-teal-500 transition-colors">{s.icon}</span>
              </a>
            ))}
          </div>
        </div>
        {/* Navigation columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <p className="text-gray-500 mb-8 max-w-md">
              LeadChoose helps real estate agents nurture leads automatically across Email, SMS & Voice. Focus on what matters most — closing deals.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Platform</h3>
            <ul className="space-y-4">
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="#pricing" className="footer-link">Pricing</a></li>
              <li><a href="#" className="footer-link">Integrations</a></li>
              <li><a href="#" className="footer-link">API</a></li>
              <li><a href="#" className="footer-link">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Resources</h3>
            <ul className="space-y-4">
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Documentation</a></li>
              <li><a href="#" className="footer-link">Guides</a></li>
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Webinars</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="footer-link">About</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Partners</a></li>
              <li><a href="#" className="footer-link">Legal</a></li>
            </ul>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LeadChoose. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="footer-link text-sm">Privacy Policy</a>
            <a href="#" className="footer-link text-sm">Terms of Service</a>
            <a href="#" className="footer-link text-sm">Cookie Policy</a>
          </div>
        </div>
        <div className="mt-6 text-center md:text-left text-gray-500 text-sm">
          Made with <Heart className="h-4 w-4 inline-block text-red-500 animate-heartbeat" /> by the LeadChoose team
        </div>
      </div>
      <style>{`
        .footer-link {
          position: relative;
          color: #6b7280;
          transition: color 0.2s;
        }
        .footer-link:hover, .footer-link:focus {
          color: #14b8a6;
        }
        .footer-link::after {
          content: '';
          display: block;
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 2px;
          background: linear-gradient(90deg, #818cf8 0%, #a5b4fc 100%);
          border-radius: 2px;
          opacity: 0;
          transform: scaleX(0);
          transition: opacity 0.2s, transform 0.2s;
        }
        .footer-link:hover::after, .footer-link:focus::after {
          opacity: 1;
          transform: scaleX(1);
        }
        @keyframes footerGlow {
          0%, 100% { opacity: 0.7; filter: blur(32px); }
          50% { opacity: 1; filter: blur(48px); }
        }
        .animate-footerGlow { animation: footerGlow 6s ease-in-out infinite; }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.2); }
          40% { transform: scale(0.95); }
          60% { transform: scale(1.1); }
          80% { transform: scale(0.98); }
        }
        .animate-heartbeat { animation: heartbeat 1.8s infinite; }
      `}</style>
    </footer>
  );
};