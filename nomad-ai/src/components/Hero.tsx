import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { CALENDAR_LINK } from '../constants/links';
import { translations } from '../translations';

export const Hero = ({ lang }: { lang: 'en' | 'hi' }) => {
  const t = translations[lang].hero;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Immersive Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 transform-gpu">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" 
          alt="Minimalist Travel"
          className="w-full h-full object-cover opacity-30 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 0.4, letterSpacing: "0.5em" }}
            transition={{ duration: 2, delay: 0.2 }}
            className="inline-block text-white text-[8px] md:text-[10px] uppercase font-bold mb-6 md:mb-10"
          >
            {t.tagline}
          </motion.span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-sans font-light text-white tracking-tight mb-6 md:mb-8 leading-[1.1]">
            {t.titlePre} <span className="italic block mt-2 md:mt-1">{t.titleItalic}</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-white/40 text-xs sm:text-sm md:text-lg font-light mb-10 md:mb-12 leading-relaxed tracking-wide px-4">
            {t.subtitle}
          </p>
          
          <div className="flex justify-center">
            <motion.a 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-white hover:text-white/80 transition-colors"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold border-b border-white/20 pb-1 group-hover:border-white transition-all underline-offset-8">
                {t.ctaPrimary}
              </span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Simplified Decorative Element */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" 
        />
      </motion.div>
    </section>
  );
};
