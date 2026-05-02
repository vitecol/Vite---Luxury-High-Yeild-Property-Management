import { motion, AnimatePresence } from 'motion/react';
import { Database, Zap, HeartHandshake, ShieldCheck, MessageSquare, UserCheck, FileText, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../translations';

const mockups = [
  {
    id: 'engagement',
    path: '/inquiry-management',
    icon: Zap,
    ui: (
      <div className="space-y-3 p-4">
        <div className="bg-white/5 p-2 rounded-lg w-[70%] text-[10px] text-white/40">"I want to book Umrah for December"</div>
        <div className="bg-white/10 p-2 rounded-lg w-[85%] ml-auto text-[10px] text-white/80 border border-white/5">
          "Assalamu Alaikum! I've found 3 premium packages for Dec. Would you like a brochure?"
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
          <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    ),
    detail: "Immediate Lead Capture"
  },
  {
    id: 'crm',
    path: '/crm-sync',
    icon: Database,
    ui: (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
          <div className="w-6 h-6 rounded-full bg-white/10" />
          <div className="h-2 w-20 bg-white/20 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-8 bg-white/5 rounded p-2 flex items-center justify-between">
            <span className="text-[8px] text-white/30 uppercase">Name</span>
            <span className="text-[8px] text-white/70">Ahmed R.</span>
          </div>
          <div className="h-8 bg-white/5 rounded p-2 flex items-center justify-between">
            <span className="text-[8px] text-white/30 uppercase">Group</span>
            <span className="text-[8px] text-white/70">Nov-24</span>
          </div>
        </div>
        <div className="h-8 bg-white/10 rounded flex items-center justify-center gap-2 border border-white/5">
          <UserCheck size={10} className="text-white/60" />
          <span className="text-[8px] text-white font-bold uppercase tracking-tighter">CRM Synced</span>
        </div>
      </div>
    ),
    detail: "Automated Data Management"
  },
  {
    id: 'docs',
    path: '/document-storage',
    icon: ShieldCheck,
    ui: (
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Files</span>
          <span className="text-[8px] text-white/80">2/4</span>
        </div>
        <div className="space-y-2">
          <div className="h-6 bg-white/10 rounded px-2 flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-2"><FileText size={8} /><span className="text-[8px]">Passport.pdf</span></div>
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
          </div>
          <div className="h-6 bg-white/5 rounded px-2 flex items-center justify-between opacity-50">
            <div className="flex items-center gap-2"><FileText size={8} /><span className="text-[8px]">Visa_Application</span></div>
            <span className="text-[8px]">Pending</span>
          </div>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} whileInView={{ width: '50%' }} className="h-full bg-white shadow-[0_0_10px_white]" />
        </div>
      </div>
    ),
    detail: "Secure Document Handling"
  },
  {
    id: 'care',
    path: '/proactive-care',
    icon: HeartHandshake,
    ui: (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-white/40 uppercase text-[8px] tracking-[0.2em]">
          <Activity size={10} /> Live Operations
        </div>
        <div className="bg-white/5 border-l-2 border-white/40 p-2 space-y-1">
          <div className="text-[8px] text-white/80 font-bold underline-offset-4">Flight Update: EK-402</div>
          <p className="text-[7px] text-white/50">"Travelers arriving in 25 mins. Shuttle driver notified & waiting."</p>
        </div>
        <div className="h-12 border border-dashed border-white/10 rounded-lg flex items-center justify-center">
          <span className="text-[8px] text-white/20 uppercase tracking-[0.3em]">Map View Active</span>
        </div>
      </div>
    ),
    detail: "Proactive Crisis Fixes"
  }
];

export const SolutionSection = ({ lang }: { lang: 'en' | 'hi' }) => {
  const t = translations[lang].solution;
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="solution" className="py-24 md:py-40 bg-black relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Custom Cursor for Hover state - only on non-touch devices */}
      <AnimatePresence>
        {activeTab !== null && !isTouch && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed z-[100] pointer-events-none hidden md:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] transform-gpu"
            style={{ 
              left: mousePos.x + 20, 
              top: mousePos.y + 20 
            }}
          >
            <MessageSquare size={14} fill="black" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Click Me</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]"
          >
            {t.tag}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-sans font-light text-white tracking-tight mt-6 leading-tight"
          >
            {t.title} <span className="italic">{t.titleItalic}</span>
          </motion.h2>
          <p className="text-white/40 text-sm md:text-base mt-6 font-light leading-relaxed max-w-lg">
            {t.text}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {mockups.map((item, index) => {
            const feature = t.features[index];
            const isActive = activeTab === index;
            const isAnyActive = activeTab !== null;

            return (
              <Link 
                to={item.path}
                key={item.id}
                className={`relative transition-all duration-700 transform-gpu ${
                  isAnyActive && !isActive ? 'opacity-20 scale-95' : 'opacity-100 scale-100'
                }`}
                onMouseEnter={() => setActiveTab(index)}
                onMouseLeave={() => setActiveTab(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group cursor-none"
                >
                  {/* Visual Emulator */}
                  <div className="aspect-[4/5] bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden flex flex-col transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] group-hover:bg-[#111111]">
                    <div className="p-6 pb-2">
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <item.icon className="text-white/60" size={16} />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        {feature.title}
                      </h3>
                    </div>

                    <div className="flex-1 px-4 py-2">
                      <div className="h-full rounded-2xl bg-black/40 border border-white/[0.03] overflow-hidden">
                        {item.ui}
                      </div>
                    </div>

                    <div className="p-6 pt-4 h-24 overflow-hidden">
                      {index !== 2 && (
                        <AnimatePresence mode="wait">
                          {!isActive ? (
                            <motion.p 
                              key="short"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-[10px] text-white/30 uppercase tracking-[0.2em]"
                            >
                              {item.detail}
                            </motion.p>
                          ) : (
                            <motion.p 
                              key="full"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-white/80 leading-relaxed font-light"
                            >
                              {feature.text}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </div>

                  {/* Decorative glow behind focus */}
                  {isActive && (
                    <motion.div 
                      layoutId="focus-glow"
                      className="absolute -inset-4 bg-white/[0.02] blur-3xl -z-10 rounded-[3rem]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
