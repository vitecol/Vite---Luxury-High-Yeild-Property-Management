import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { MailWarning, FileStack, Users, ChevronRight, PhoneCall } from 'lucide-react';
import { translations } from '../translations';

const VisualElement = ({ type, progress, range }: { type: 'inbox' | 'docs' | 'support', progress: any, range: number[] }) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const scale = useTransform(progress, range, [0.8, 1, 1, 1.2]);
  const rotate = useTransform(progress, range, [-5, 0, 0, 5]);
  
  return (
    <motion.div 
      style={{ opacity, scale, rotate }}
      className="w-full h-full flex items-center justify-center p-8 transform-gpu"
    >
      <div className="relative w-full max-w-[450px] aspect-square rounded-[3.5rem] border border-white/10 bg-black/40 p-12 flex flex-col backdrop-blur-xl shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-50" />
        
        {type === 'inbox' && (
          <div className="relative h-full flex flex-col">
            <div className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-bold mb-8">Lead Leakage • Live Stream</div>
            
            <div className="flex-1 flex flex-col gap-4">
               {[...Array(5)].map((_, i) => (
                 <motion.div 
                   key={i}
                   initial={{ x: 50, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   transition={{ delay: i * 0.1, duration: 0.5 }}
                   className={`p-4 rounded-2xl border ${i === 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-white/5 border-white/10'} flex items-start gap-4`}
                 >
                   <div className={`w-10 h-10 rounded-xl ${i === 0 ? 'bg-red-500/20' : 'bg-white/5'} flex items-center justify-center shrink-0`}>
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-400 animate-pulse' : 'bg-white/20'}`} />
                   </div>
                   <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                         <div className={`h-2 w-24 rounded-full ${i === 0 ? 'bg-red-400/40' : 'bg-white/20'}`} />
                         <span className="text-[8px] text-white/20 font-mono">10:4{i} AM</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full" />
                      {i === 0 && (
                        <div className="text-[9px] text-red-400 font-bold uppercase tracking-tight">Status: Lost to Competitor</div>
                      )}
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        )}

        {type === 'docs' && (
          <div className="relative h-full flex flex-col">
            <div className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-bold mb-10">Manual Data Silos</div>
            
            <div className="flex-1 grid grid-cols-2 gap-6 pb-4">
               {['Visa.pdf', 'Passport.jpg', 'Vaccine.png', 'Flight.pdf'].map((doc, i) => (
                 <motion.div 
                   key={i}
                   animate={{ 
                     y: [0, (i % 2 ? 10 : -10), 0],
                     rotate: [(i % 2 ? 2 : -2), (i % 2 ? -2 : 2), (i % 2 ? 2 : -2)]
                   }}
                   transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                   className="relative aspect-[3/4] bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col"
                 >
                    <div className="w-full h-2/3 bg-white/5 rounded-lg mb-4 flex items-center justify-center">
                       <FileStack size={24} className="text-white/10" />
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full mb-2" />
                    <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
                    
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-500 font-bold text-[10px]">!</div>
                 </motion.div>
               ))}
            </div>
            <div className="text-[10px] text-red-400/60 font-medium text-center uppercase tracking-widest mt-4">
               Manual Follow-up Required
            </div>
          </div>
        )}

        {type === 'support' && (
          <div className="relative h-full flex flex-col">
            <div className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-bold mb-10">Operational Choke Point</div>
            
            <div className="flex-1 flex flex-col gap-6">
               <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 relative">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Urgent: Hotel Overbook</span>
                     <Users size={14} className="text-red-400" />
                  </div>
                  <div className="space-y-2">
                     <div className="h-2 w-full bg-white/5 rounded-full" />
                     <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                  </div>
                  <div className="absolute -right-3 -top-3 w-10 h-10 rounded-full bg-red-500 flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                     <PhoneCall size={16} className="text-white" />
                  </div>
               </div>

               <div className="flex flex-col gap-3 opacity-40 grayscale pointer-events-none">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                     <div className="h-1.5 w-1/2 bg-white/20 rounded-full mb-2" />
                     <div className="h-1.5 w-full bg-white/10 rounded-full" />
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                     <div className="h-1.5 w-1/3 bg-white/20 rounded-full mb-2" />
                     <div className="h-1.5 w-2/3 bg-white/10 rounded-full" />
                  </div>
               </div>
            </div>
            
            <div className="mt-auto text-center py-4 border-t border-white/5">
               <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-medium">New Sales: 0 (Blocked by Support)</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Scene = ({ 
  icon: Icon, 
  title, 
  description, 
  progress, 
  range,
  type
}: { 
  icon: any, 
  title: string, 
  description: string, 
  progress: any, 
  range: number[],
  type: 'inbox' | 'docs' | 'support'
}) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [40, 0, 0, -40]);
  const blur = useTransform(progress, range, ["10px", "0px", "0px", "10px"]);

  return (
    <motion.div 
      style={{ opacity, y, filter: `blur(${blur})` }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu"
    >
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className="max-w-xl text-left transform-gpu">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Icon className="text-white/40" size={24} />
            </div>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-sans font-light text-white tracking-tighter mb-8 leading-[1.05]">
            {title}
          </h3>
          <p className="text-lg md:text-2xl text-white/40 font-light leading-relaxed mb-12 max-w-md">
            {description}
          </p>
          <div className="flex items-center gap-3 text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
            Process Friction <ChevronRight size={10} />
          </div>
        </div>
        
        <div className="hidden lg:block transform-gpu">
          <VisualElement type={type} progress={progress} range={range} />
        </div>
      </div>
    </motion.div>
  );
};

export const ProblemSection = ({ lang }: { lang: 'en' | 'hi' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].problem;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 15 });
  const bgOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="the-problem" 
      ref={containerRef} 
      className="relative h-[500vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 z-0"
        >
          {/* Precise Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {/* Atmospheric Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-red-950/20 blur-[200px] rounded-full opacity-50" />
        </motion.div>

        {/* Intro */}
        <motion.div
          style={{ 
            opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]),
            y: useTransform(smoothProgress, [0, 0.1], [0, -60]),
            scale: useTransform(smoothProgress, [0, 0.1], [1, 0.95]),
            filter: useTransform(smoothProgress, [0, 0.1], ["blur(0px)", "blur(20px)"])
          }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <div className="mb-16 inline-flex flex-col items-center">
            <span className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-[1em] block mb-8">
              {t.tag}
            </span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
          <h2 className="text-6xl md:text-9xl font-sans font-light text-white tracking-tighter leading-[0.9] mb-12">
            {t.title} <br />
            <span className="text-white/[0.15] italic font-thin">{t.titleItalic}</span>
          </h2>
          <div className="flex justify-center gap-16 mt-16 pb-20">
             <div className="w-[1px] h-32 bg-gradient-to-b from-white/[0.05] to-transparent" />
          </div>
        </motion.div>

        {/* Scenic Layouts */}
        <Scene 
          progress={smoothProgress}
          range={[0.1, 0.28, 0.42, 0.52]}
          icon={MailWarning}
          title={t.cards[0].title}
          description={t.cards[0].desc}
          type="inbox"
        />
        <Scene 
          progress={smoothProgress}
          range={[0.4, 0.55, 0.68, 0.78]}
          icon={FileStack}
          title={t.cards[1].title}
          description={t.cards[1].desc}
          type="docs"
        />
        <Scene 
          progress={smoothProgress}
          range={[0.65, 0.8, 0.92, 0.98]}
          icon={Users}
          title={t.cards[2].title}
          description={t.cards[2].desc}
          type="support"
        />
        
        {/* Progress Indicator */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6">
           {[0.25, 0.5, 0.75].map((val, i) => (
             <motion.div 
               key={i}
               style={{ 
                 opacity: useTransform(smoothProgress, [val - 0.1, val, val + 0.1], [0.1, 1, 0.1]),
                 scale: useTransform(smoothProgress, [val - 0.1, val, val + 0.1], [1, 1.3, 1]),
                 backgroundColor: useTransform(smoothProgress, [val - 0.1, val, val + 0.1], ["rgba(255,255,255,0.2)", "rgba(255,255,255,1)", "rgba(255,255,255,0.2)"])
               }}
               className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full"
             />
           ))}
        </div>
      </div>
    </section>
  );
};



