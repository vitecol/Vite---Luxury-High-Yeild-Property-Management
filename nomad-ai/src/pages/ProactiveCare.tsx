import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { HeartHandshake, PhoneCall, Map, Bell, ArrowLeft, Activity, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

import { useState, useEffect } from 'react';

export const ProactiveCare = () => {
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

  const y = useTransform(smoothScrollY, [0, 1], [0, 300]);

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
              <span className="text-white/30 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Concierge</span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-light tracking-tight mt-6 mb-8 leading-tight">
                Proactive <br />
                <span className="italic">Customer Care</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12">
                Nomad AI doesn't wait for a complaint. It monitors every step of the journey—from airport arrivals to hotel check-ins—solving issues before your travelers even notice them.
              </p>

              <div className="space-y-8 md:space-y-12">
                {[
                  { icon: Activity, title: "Real-time Monitoring", desc: "Tracks flight delays and shuttle positions to adjust schedules on the fly." },
                  { icon: Bell, title: "Instant Notifications", desc: "Automated alerts for prayer times, departure changes, and hotel keys." },
                  { icon: Users, title: "Human Transition", desc: "Seamlessly hands over complex medical or personal issues to your staff with full context." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-4 md:gap-6 lg:gap-8 group cursor-default"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <div className="shrink-0 pt-1">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                        <item.icon className="text-white opacity-40 group-hover:opacity-100 transition-opacity" size={20} md:size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white text-lg md:text-xl font-medium mb-1 md:mb-2 tracking-tight group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
                      <p className="text-white/40 text-[13px] md:text-sm font-light leading-relaxed group-hover:text-white/60 transition-colors duration-300">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              style={{ y: isTouch ? 0 : y }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative lg:mt-32"
            >
              <div className="relative h-full bg-[#0A0A0A] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 backdrop-blur-3xl overflow-hidden shadow-2xl group/card">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 to-transparent pointer-events-none opacity-50" />
                
                <div className="flex items-center justify-between mb-12 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <Map className="text-white/40" size={16} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/60">Operational Pulse</span>
                  </div>
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -4, zIndex: 20 }}
                        className="w-6 h-6 rounded-full border border-black bg-white/10 cursor-pointer relative z-10" 
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-6 relative z-10">
                   <motion.div 
                     whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
                     className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 transition-all duration-300 cursor-default"
                   >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-[10px] uppercase font-bold tracking-widest text-green-400 mb-1 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                            Issue Resolved
                          </div>
                          <div className="text-sm font-medium">Hotel Shuttle Delay • Jeddah</div>
                        </div>
                        <CheckCircle size={16} className="text-green-400" />
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed font-light">
                        "Shuttle #4 stuck in traffic. AI notified 14 travelers via WhatsApp and coordinated with driver of Shuttle #5 for pickup. 0 traveler complaints."
                      </p>
                   </motion.div>

                   <motion.div 
                     whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                     className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden transition-all duration-300 cursor-default"
                   >
                      <div className="absolute top-0 right-0 p-4">
                         <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      </div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-4">Live Support Feed</div>
                      <div className="space-y-4">
                         <div className="flex gap-3 items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                            <p className="text-[11px] text-white/60 font-light leading-relaxed">"Ziyarah timings for Group B updated to 4:00 AM. Notifications sent."</p>
                         </div>
                         <div className="flex gap-3 items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                            <p className="text-[11px] text-white/60 font-light leading-relaxed">"Temperature in Madinah rising. Reminder sent to travelers for hydration."</p>
                         </div>
                      </div>
                   </motion.div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 relative z-10">
                   <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/20">
                      <span>Agency Dashboard Access</span>
                      <motion.div 
                        whileHover={{ scale: 1.1, color: "#fff" }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer p-2 -m-2 rounded-full hover:bg-white/5 transition-all"
                      >
                        <PhoneCall size={14} />
                      </motion.div>
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

const CheckCircle = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
