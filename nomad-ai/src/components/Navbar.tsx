import { motion } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { CALENDAR_LINK } from '../constants/links';
import { translations } from '../translations';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = ({ lang, setLang }: { lang: 'en' | 'hi', setLang: (l: 'en' | 'hi') => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const t = translations[lang].nav;

  const isHome = location.pathname === '/';

  const NavLink = ({ item }: { item: { name: string, id: string } }) => {
    const href = isHome ? `#${item.id}` : `/#${item.id}`;
    
    if (isHome) {
      return (
        <a 
          href={href}
          className="text-white/60 hover:text-white text-xs uppercase tracking-widest transition-colors"
        >
          {item.name}
        </a>
      );
    }

    return (
      <Link 
        to={href}
        className="text-white/60 hover:text-white text-xs uppercase tracking-widest transition-colors"
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 transition-all duration-500 transform-gpu">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex justify-between items-center h-12 md:grid md:grid-cols-3 md:h-auto">
        <Link 
          to="/"
          className="text-white font-sans text-xl md:text-2xl font-bold tracking-[0.3em] mix-blend-difference z-20 shrink-0"
        >
          VITE
        </Link>
        
        <div className="hidden md:flex gap-8 lg:gap-12 items-center justify-center">
          {[
            { name: t.problem, id: 'the-problem' },
            { name: t.solution, id: 'solution' },
            { name: t.features, id: 'features' },
            { name: t.contact, id: 'contact' }
          ].map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <NavLink item={item} />
            </motion.div>
          ))}
        </div>
        
        <div className="flex gap-3 md:gap-4 lg:gap-6 items-center justify-end">
          <button 
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="hidden lg:flex items-center gap-2 text-white/50 hover:text-white transition-all text-[9px] font-bold uppercase tracking-[0.15em] border border-white/5 bg-white/5 px-2.5 py-1 rounded-full hover:bg-white/10"
          >
            <Globe size={10} className="opacity-80" />
            {lang === 'en' ? 'Hindi' : 'English'}
          </button>

          <motion.a
            href={CALENDAR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 md:px-5 lg:px-7 py-1.5 md:py-2 rounded-full border border-white/30 text-white text-[9px] md:text-[10px] lg:text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] whitespace-nowrap"
          >
            {t.demo}
          </motion.a>

          <div className="md:hidden z-20 flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 w-full min-h-screen bg-black/95 backdrop-blur-xl p-8 flex flex-col justify-center gap-8 text-center"
        >
          {[
            { name: t.problem, id: 'the-problem' },
            { name: t.solution, id: 'solution' },
            { name: t.features, id: 'features' },
            { name: t.contact, id: 'contact' }
          ].map((item) => (
            <div key={item.id} onClick={() => setIsOpen(false)}>
              <NavLink item={item} />
            </div>
          ))}
          <button 
            onClick={() => {
              setLang(lang === 'en' ? 'hi' : 'en');
              setIsOpen(false);
            }}
            className="text-white/40 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <Globe size={14} />
            Switch to {lang === 'en' ? 'Hindi' : 'English'}
          </button>
          <a 
            href={CALENDAR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 text-center rounded-xl bg-white text-black text-sm uppercase tracking-widest font-medium"
          >
            {t.demo}
          </a>
        </motion.div>
      )}
    </nav>
  );
};
