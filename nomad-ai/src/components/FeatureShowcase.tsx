import { motion } from 'motion/react';
import { Database, FileCheck, PhoneCall, Filter } from 'lucide-react';
import { translations } from '../translations';

const icons = [Database, FileCheck, PhoneCall, Filter];

export const FeatureShowcase = ({ lang }: { lang: 'en' | 'hi' }) => {
  const t = translations[lang].capabilities;

  return (
    <section id="features" className="py-24 md:py-48 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-16 md:mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/30 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]"
          >
            {t.tag}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-7xl font-sans font-light text-white tracking-tight mt-6 md:mt-8 leading-[1.1]"
          >
            {t.title} <br />
            <span className="italic opacity-80">{t.titleItalic}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
          {t.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: i * 0.1, 
                  duration: 1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                viewport={{ once: true, margin: "-10%" }}
                className="group relative transform-gpu"
              >
                <div className="flex flex-col">
                  <div className="mb-10 flex items-center justify-between">
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                      <Icon className="text-white group-hover:text-black transition-colors" size={24} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 group-hover:text-white/60 transition-colors">
                      {item.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-sans font-medium text-white mb-6 tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/40 text-lg leading-relaxed font-light max-w-sm group-hover:text-white/60 transition-colors">
                    {item.desc}
                  </p>
                  
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
