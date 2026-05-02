/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { FeatureShowcase } from './components/FeatureShowcase';
import { motion, useScroll, useSpring } from 'motion/react';
import { useState } from 'react';
import { translations } from './translations';
import { CALENDAR_LINK } from './constants/links';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { InquiryManagement } from './pages/InquiryManagement';
import { CRMSync } from './pages/CRMSync';
import { DocumentStorage } from './pages/DocumentStorage';
import { ProactiveCare } from './pages/ProactiveCare';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const LandingPage = ({ lang, setLang }: { lang: 'en' | 'hi', setLang: (l: 'en' | 'hi') => void }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[60] origin-left" 
        style={{ scaleX }}
      />
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <ProblemSection lang={lang} />
        <SolutionSection lang={lang} />
        <FeatureShowcase lang={lang} />
        
        <section id="contact" className="py-24 md:py-40 bg-black relative flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] border border-white/20 rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[500px] md:h-[500px] border border-white/20 rounded-full" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-sans font-light tracking-tighter mb-8 italic">
                {translations[lang].ctaSection.title}
              </h2>
              <p className="text-white/40 text-lg md:text-xl font-light mb-10 md:mb-12 max-w-xl mx-auto px-4">
                {translations[lang].ctaSection.text}
              </p>
              <a 
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 md:px-12 md:py-6 rounded-full bg-white text-black font-semibold text-xs md:text-sm uppercase tracking-[0.2em] hover:scale-105 transition-transform"
              >
                {translations[lang].ctaSection.button}
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Routes>
          <Route path="/" element={<LandingPage lang={lang} setLang={setLang} />} />
          <Route path="/inquiry-management" element={<InquiryManagement />} />
          <Route path="/crm-sync" element={<CRMSync />} />
          <Route path="/document-storage" element={<DocumentStorage />} />
          <Route path="/proactive-care" element={<ProactiveCare />} />
        </Routes>

        <footer className="py-12 md:py-20 border-t border-white/10 bg-[#050505]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div className="sm:col-span-2">
                <div className="text-xl md:text-2xl font-sans font-medium tracking-tight mb-6 text-white uppercase tracking-[0.2em]">VITE</div>
                <p className="text-white/40 text-sm max-w-xs leading-relaxed font-light">
                  Redefining travel operations through intelligent automation and empathetic AI support.
                </p>
              </div>
              <div>
                <h4 className="text-white/80 text-xs font-semibold uppercase tracking-[0.2em] mb-6">Platform</h4>
                <ul className="space-y-4 text-sm text-white/40 font-light">
                  <li><Link to="/inquiry-management" className="hover:text-white transition-colors">Inquiry Management</Link></li>
                  <li><Link to="/crm-sync" className="hover:text-white transition-colors">CRM Sync</Link></li>
                  <li><Link to="/document-storage" className="hover:text-white transition-colors">Document Storage</Link></li>
                  <li><Link to="/proactive-care" className="hover:text-white transition-colors">Proactive Care</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white/80 text-xs font-semibold uppercase tracking-[0.2em] mb-6">Connect</h4>
                <ul className="space-y-4 text-sm text-white/40 font-light">
                  <li><a href="https://wa.me/916370853319" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-white/20 text-[9px] md:text-[10px] uppercase tracking-widest text-center md:text-left">© 2024 VITE OPERATIONS. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-6 md:gap-8">
                <a href="#" className="text-white/20 text-[9px] md:text-[10px] uppercase tracking-widest hover:text-white">Privacy Policy</a>
                <a href="#" className="text-white/20 text-[9px] md:text-[10px] uppercase tracking-widest hover:text-white">Terms of Work</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
