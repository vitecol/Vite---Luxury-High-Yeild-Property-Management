import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ShieldCheck, FileText, CheckCircle, Clock, ArrowLeft, Upload, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

import { useState, useEffect } from 'react';

export const DocumentStorage = () => {
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
              <span className="text-white/30 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Vault</span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-light tracking-tight mt-6 mb-8 leading-tight">
                Document <br />
                <span className="italic">Storage & OCR</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12">
                Collecting passports shouldn't be a security risk. Our AI vault uses military-grade encryption and built-in OCR to extract traveler data instantly while keeping sensitive docs off WhatsApp groups.
              </p>

              <div className="space-y-8 md:space-y-12">
                {[
                  { icon: ShieldCheck, title: "GDPR & HIPAA Compliant", desc: "Data is encrypted at rest and in transit. Your agency's liability is significantly reduced." },
                  { icon: CheckCircle, title: "Automated OCR Verification", desc: "AI reads the MRZ (Machine Readable Zone) of passports to detect expired or invalid documents instantly." },
                  { icon: Lock, title: "Zero-Knowledge Storage", desc: "Only authorized agency representatives can access traveler documents through the secure dashboard." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 md:gap-8 group">
                    <div className="shrink-0 pt-1">
                      <item.icon className="text-white opacity-40 group-hover:opacity-100 transition-opacity" size={20} md:size={24} />
                    </div>
                    <div>
                      <h3 className="text-white text-lg md:text-xl font-medium mb-2 md:mb-3 tracking-tight">{item.title}</h3>
                      <p className="text-white/40 text-[13px] md:text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              style={{ y: isTouch ? 0 : y }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative lg:mt-24"
            >
              <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 backdrop-blur-3xl">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-white/40" size={18} />
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/60">Encrypted Vault</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                   <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                         <FileText size={20} className="text-white/60" />
                      </div>
                      <div className="flex-1">
                         <div className="text-sm font-medium text-white/90">Passport_Sarah.jpg</div>
                         <div className="text-[10px] text-white/30 uppercase mt-1">Status: OCR Verified • 2.4 MB</div>
                      </div>
                      <CheckCircle className="text-green-500 opacity-60" size={18} />
                   </div>

                   <div className="p-5 rounded-2xl bg-white/[0.01] border border-dashed border-white/10 flex items-center gap-4 opacity-50">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.02] flex items-center justify-center">
                         <Clock size={20} className="text-white/20" />
                      </div>
                      <div className="flex-1">
                         <div className="text-sm font-medium text-white/40">Visa_Application.pdf</div>
                         <div className="text-[10px] text-white/20 uppercase mt-1">Status: Pending Upload</div>
                      </div>
                      <Upload className="text-white/20" size={18} />
                   </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Extracted Metadata</span>
                      <span className="text-[10px] text-white/50">Confidence: 99.8%</span>
                   </div>
                   <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <div>
                         <div className="text-[9px] uppercase text-white/20 mb-1">Full Name</div>
                         <div className="text-xs text-white/80">SARAH AHMED KHAN</div>
                      </div>
                      <div>
                         <div className="text-[9px] uppercase text-white/20 mb-1">Passport No.</div>
                         <div className="text-xs text-white/80 font-mono tracking-widest">G823194021</div>
                      </div>
                      <div>
                         <div className="text-[9px] uppercase text-white/20 mb-1">Expiry Date</div>
                         <div className="text-xs text-white/80">24 JAN 2029</div>
                      </div>
                      <div>
                         <div className="text-[9px] uppercase text-white/20 mb-1">Nationality</div>
                         <div className="text-xs text-white/80">BRITISH</div>
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
