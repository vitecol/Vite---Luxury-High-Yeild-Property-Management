import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Database, Link as LinkIcon, ArrowRight, Table, Tags, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

import { useState, useEffect } from 'react';

export const CRMSync = () => {
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
              <span className="text-white/30 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Engine</span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-light tracking-tight mt-6 mb-8 leading-tight">
                CRM <br />
                <span className="italic">Synchronization</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12">
                Say goodbye to copy-pasting numbers from WhatsApp to Excel. Nomad AI structure-tags every lead and pushes them into your CRM with zero human intervention.
              </p>

              <div className="grid grid-cols-1 gap-6 md:gap-8">
                {[
                  { icon: LinkIcon, title: "Universal Connect", desc: "Native integrations with HubSpot, Salesforce, or your custom Airtable/Google Sheets setup." },
                  { icon: Tags, title: "Auto-Tagging", desc: "Categorizes customers by language, budget, and travel history automatically." },
                  { icon: Table, title: "Clean Data Entry", desc: "No more typos or missing phone numbers. Data is validated at the source." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 items-start group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-white transition-all duration-500">
                      <item.icon size={18} className="text-white group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg md:text-xl font-medium mb-2 tracking-tight">{item.title}</h3>
                      <p className="text-white/40 text-[13px] md:text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              style={{ y: isTouch ? 0 : y }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-1 overflow-hidden lg:mt-32"
            >
              <div className="bg-black rounded-[1.8rem] md:rounded-[2.8rem] p-6 md:p-8">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold">V</div>
                  <div className="h-4 w-32 bg-white/5 rounded" />
                  <div className="ml-auto flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-white/20" />
                    <div className="h-2 w-2 rounded-full bg-white/20" />
                    <div className="h-2 w-2 rounded-full bg-white/20" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Bilal Hasan", tag: "Hot Lead", status: "Umrah Premium" },
                    { name: "Fatima Khan", tag: "Returning", status: "Hajj Group B" },
                    { name: "Omar Rayyan", tag: "Follow Up", status: "Hajj Flight Only" }
                  ].map((row, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] text-white/40">ID:{823+i}</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white/80">{row.name}</div>
                        <div className="text-[10px] text-white/30 uppercase tracking-tighter">{row.status}</div>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border border-white/10 font-bold uppercase ${i === 0 ? 'bg-white text-black' : 'text-white/40'}`}>
                        {row.tag}
                      </span>
                    </motion.div>
                  ))}
                  
                  <div className="pt-6 flex justify-center">
                     <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-white/20">
                        <Database size={10} />
                        Syncing in Real Time
                        <span className="w-1 h-1 rounded-full bg-green-500" />
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};
