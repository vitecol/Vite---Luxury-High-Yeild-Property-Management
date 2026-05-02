import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { MessageSquare, Zap, Clock, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

import { useState, useEffect } from 'react';

export const InquiryManagement = () => {
  const containerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const y = useTransform(smoothScrollY, [0, 1], [0, 250]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm md:backdrop-blur-none">
        <Link to="/" className="text-white font-sans text-xl md:text-2xl font-bold tracking-[0.3em] flex items-center gap-3 md:gap-4 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
          VITE
        </Link>
      </nav>

      <main className="pt-24 md:pt-32 pb-24 md:pb-40" ref={containerRef}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:sticky md:top-32"
            >
              <span className="text-white/30 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Front Desk</span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-light tracking-tight mt-6 mb-8 leading-tight">
                Inquiry <br />
                <span className="italic">Management</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12">
                Nomad AI intercepts every lead across WhatsApp, Email, and Instagram. It's not just a chatbot; it's a qualified reservation agent that understands nuance, urgency, and luxury service.
              </p>

              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Zap, title: "0.2s Response Time", desc: "Beat your competitors by being the first to respond, every single time." },
                  { icon: Clock, title: "24/7 Availability", desc: "Handle midnight inquiries from international travelers without overtime pay." },
                  { icon: Users, title: "Contextual Understanding", desc: "Recognizes returning customers and their historical preferences immediately." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 md:gap-6">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-white/60" />
                    </div>
                    <div>
                      <h3 className="text-white text-sm md:text-base font-medium mb-1 tracking-tight">{item.title}</h3>
                      <p className="text-white/40 text-[13px] md:text-sm font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              style={{ y: isTouch ? 0 : y }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-square lg:mt-20"
            >
              <div className="absolute inset-0 bg-white/5 blur-3xl opacity-20 rounded-full" />
              <div className="relative h-full bg-[#0A0A0A] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Live Feed</span>
                  </div>
                  <MessageSquare size={16} className="text-white/20" />
                </div>

                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 max-w-[85%]"
                  >
                    <p className="text-xs text-white/50 mb-1">Traveler (UK)</p>
                    <p className="text-[13px] text-white/90">"Looking for an Umrah package with direct flights from London in October. My mother uses a wheelchair."</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/10 p-4 rounded-2xl rounded-tr-none border border-white/10 ml-auto max-w-[85%]"
                  >
                    <p className="text-xs text-white/60 mb-2">Nomad AI Agent</p>
                    <p className="text-[13px] text-white">"Assalamu Alaikum! I've flagged this for wheelchair-accessible hotels in Makkah. We have 3 direct flight slots with Saudi Airlines left. Should I hold a quote for you?"</p>
                    <div className="mt-3 flex items-center gap-2">
                       <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Urgent</span>
                       <span className="text-[10px] text-white/40 italic">Intent: 94% Buy Score</span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};
