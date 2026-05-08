/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  ChevronRight, 
  Globe, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Key, 
  Minus, 
  Plus,
  ArrowRight
} from 'lucide-react';
import { useState, useEffect, useRef, FormEvent } from 'react';

// --- Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDocFromServer
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// --- Firebase Initialization ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// --- Firestore Error Handler ---
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test Connection
async function testConnection() {
  try {
    const testDocPath = 'test/connection';
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

// --- Constants ---

const MARKETS = [
  { name: 'Saudi Arabia', city: 'Riyadh', img: 'https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?auto=format&fit=crop&q=80&w=1200' },
  { name: 'UAE', city: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Turkey', city: 'Bodrum', img: 'https://images.unsplash.com/photo-1583061386694-e364c84ba31d?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Jordan', city: 'Amman', img: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=1200' },
  { name: 'USA', city: 'Miami', img: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Canada', city: 'Toronto', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200' },
];

const SERVICES = [
  { title: "Asset Optimization", desc: "Expert interior styling and professional staging to maximize visual appeal and nightly rates." },
  { title: "Full Operations", desc: "From guest screening to 24/7 concierge and professional housekeeping, we handle it all." },
  { title: "Revenue Management", desc: "Proprietary algorithms adjust pricing in real-time to match market demand and events." },
  { title: "Global Compliance", desc: "We navigate local regulations and tax requirements across all our active jurisdictions." }
];

// --- Components ---

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-500 ${
      scrolled ? 'bg-white/80 backdrop-blur-md py-4 border-b border-black/5 text-black' : 'text-white'
    }`}>
      <div className="flex items-baseline gap-3">
        <span className="text-lg tracking-[0.4em] font-light uppercase serif italic">Vite</span>
        <div className={`w-[1px] h-3 transition-colors duration-500 ${scrolled ? 'bg-black/20' : 'bg-white/20'}`} />
        <span className="text-[9px] tracking-[0.3em] uppercase opacity-60 font-medium">Property Group</span>
      </div>
      <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-semibold items-center">
        <a href="#market" className="hover:text-luxury-gold transition-colors">Global Presence</a>
        <a href="#comparison" className="hover:text-luxury-gold transition-colors">Financials</a>
        <a href="#services" className="hover:text-luxury-gold transition-colors">Services</a>
        <a href="#contact" className={`px-8 py-2.5 rounded-full border transition-all duration-300 ${
          scrolled 
            ? 'border-black hover:bg-black hover:text-white' 
            : 'border-white/30 hover:bg-white hover:text-black'
        }`}>
          Enquire
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative h-screen flex items-end pb-24 px-6 md:px-12 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-60 scale-110">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2400" 
          alt="Luxury Villa" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      
      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <h1 className="text-white text-6xl md:text-[120px] leading-[0.85] serif font-light tracking-tight mb-8">
            The Art of <br /> <span className="italic">Yield Preservation</span>
          </h1>
          <p className="text-white/60 text-sm md:text-lg max-w-xl font-light leading-relaxed tracking-wide">
            Transforming exclusive properties into high-performance assets. Full-service short-term rental management across six global markets.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-12 right-12 z-10 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-4 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium vertical-text">Scroll to explore</span>
          <div className="w-[1px] h-24 bg-white/20" />
        </div>
      </motion.div>
    </section>
  );
}

function MarketShowcase() {
  return (
    <section id="market" className="py-32 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-semibold mb-6 block">Our Footprint</span>
          <h2 className="text-4xl md:text-6xl serif leading-tight">Global presence, <br /><span className="italic">local expertise.</span></h2>
        </div>
        <div className="flex gap-4 border-b border-black/10 pb-4">
          <span className="text-[10px] uppercase tracking-widest font-bold">Expanding: Canada</span>
          <Globe className="w-4 h-4 text-luxury-gold" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/10">
        {MARKETS.map((market, idx) => (
          <motion.div 
            key={idx}
            className="group relative aspect-[4/5] overflow-hidden border-r border-b border-black/10"
            whileHover="hover"
          >
            <img 
              src={market.img} 
              alt={market.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-full p-8 text-white">
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium mb-1 block opacity-80">{market.city}</span>
              <h3 className="text-2xl serif italic">{market.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const LOCATIONS: Record<string, string[]> = {
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'AlUla'],
  'UAE': ['Dubai', 'Abu Dhabi', 'Ras Al Khaimah'],
  'Turkey': ['Istanbul', 'Bodrum', 'Antalya'],
  'Jordan': ['Amman', 'Aqaba', 'Dead Sea'],
  'USA': ['Miami', 'New York', 'Los Angeles'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal'],
};

const PROPERTY_TYPES = [
  { label: 'Studio', rate: 200 },
  { label: '1 Bedroom', rate: 350 },
  { label: '2 Bedroom', rate: 400 },
  { label: '3 Bedroom', rate: 550 },
  { label: 'Villa', rate: 850 },
];

function ComparisonCalculator() {
  const [ltrRent, setLtrRent] = useState(2500);
  const [country, setCountry] = useState('Saudi Arabia');
  const [city, setCity] = useState('Riyadh');
  const [propType, setPropType] = useState(PROPERTY_TYPES[1]); // 1 Bedroom default
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateRevenue = () => {
    const monthlyStr = propType.rate * 30 * 0.88;
    const annualStr = monthlyStr * 12;
    const annualLtr = ltrRent * 12;
    const alpha = annualStr - annualLtr;
    
    return { monthlyStr, annualStr, annualLtr, alpha };
  };

  const financials = calculateRevenue();

  return (
    <section id="comparison" className="py-32 bg-luxury-ink text-luxury-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
            <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-semibold mb-6 block">The Yield Gap</span>
            <h2 className="text-4xl md:text-7xl serif leading-tight mb-8">Projection <br /><span className="italic">Analysis.</span></h2>
            <p className="text-luxury-cream/60 font-light leading-relaxed mb-12 text-lg max-w-lg">
              Our modeling accounts for a conservative 88% global occupancy rate, leveraging market-specific nightly premiums that traditional leases cannot capture.
            </p>
            
            <div className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10">
              {/* LTR Input */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-40">Monthly LTR Rent (USD)</label>
                <input 
                  type="number" 
                  value={ltrRent}
                  onChange={(e) => setLtrRent(Number(e.target.value))}
                  className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-luxury-gold transition-colors text-xl font-light"
                />
              </div>

              {/* Country & City */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-40">Country</label>
                  <select 
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setCity(LOCATIONS[e.target.value][0]);
                    }}
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-luxury-gold transition-colors appearance-none cursor-pointer"
                  >
                    {Object.keys(LOCATIONS).map(c => <option key={c} value={c} className="bg-luxury-ink">{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-40">City</label>
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-luxury-gold transition-colors appearance-none cursor-pointer"
                  >
                    {LOCATIONS[country].map(c => <option key={c} value={c} className="bg-luxury-ink">{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-40">Property Type</label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-2">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type.label}
                      onClick={() => setPropType(type)}
                      className={`py-2 px-1 text-[9px] uppercase tracking-tighter border transition-all duration-300 rounded ${
                        propType.label === type.label 
                        ? 'border-luxury-gold bg-luxury-gold text-luxury-ink font-bold' 
                        : 'border-white/10 hover:border-white/40'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsCalculated(true)}
                className="w-full mt-6 py-4 bg-luxury-gold text-luxury-ink uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-white transition-colors duration-500 rounded"
              >
                Sync Market Data
              </button>
            </div>
          </div>

          <div className="relative pt-4">
            <AnimatePresence mode="wait">
              {isCalculated ? (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="p-10 border border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-start mb-8">
                       <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-40">Traditional Annual Yield</span>
                       <Minus className="w-4 h-4 opacity-20" />
                    </div>
                    <span className="text-4xl md:text-5xl serif opacity-30">${financials.annualLtr.toLocaleString()}</span>
                    <p className="text-[10px] uppercase tracking-widest opacity-20 mt-4">Static Lease Revenue</p>
                  </div>

                  <div className="p-10 border border-luxury-gold/30 bg-luxury-gold/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6">
                      <TrendingUp className="w-12 h-12 text-luxury-gold opacity-30" />
                    </div>
                    <div className="flex justify-between items-start mb-8">
                       <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-gold">Managed STR Yield</span>
                       <Plus className="w-4 h-4 text-luxury-gold" />
                    </div>
                    <span className="text-6xl md:text-8xl serif text-luxury-gold">${financials.annualStr.toLocaleString()}</span>
                    <div className="mt-8 flex gap-8">
                      <div>
                        <span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">Nightly Rate</span>
                        <span className="text-xl serif italic text-luxury-gold">${propType.rate}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">Target Occupancy</span>
                        <span className="text-xl serif italic text-luxury-gold">88%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center py-12">
                    <div className="text-center">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold mb-4 block underline underline-offset-8">The Annual Alpha</span>
                      <h3 className="text-4xl md:text-6xl serif italic text-white">+${financials.alpha.toLocaleString()}</h3>
                      <p className="text-xs opacity-40 mt-6 font-light">Projected additional profit managed by Vite</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-[600px] flex items-center justify-center border border-dashed border-white/10 rounded-3xl">
                  <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 animate-pulse">Configure property details to view projection</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-semibold mb-6 block">Our Approach</span>
          <h2 className="text-4xl md:text-6xl serif">End-to-End <br /><span className="italic">Excellence</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {SERVICES.map((s, idx) => (
            <div key={idx} className="group">
              <div className="mb-8 overflow-hidden h-64 bg-luxury-cream">
                <img 
                  src={`https://images.unsplash.com/photo-${[
                    '1618221195710-dd6b41faaea6', // Asset Optimization - Interior
                    '1560448204-e02f11c3d0e2', // Full Operations - Management
                    '1460925895917-afdab827c52f', // Revenue Management - Data/Tech
                    '1486406146926-c627a92ad1ab'  // Global Compliance - Architecture
                  ][idx]}?auto=format&fit=crop&q=80&w=800`} 
                  alt={s.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
              </div>
              <h3 className="text-xl serif italic mb-4">{s.title}</h3>
              <p className="text-sm font-light leading-relaxed text-black/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(formRef.current!);
    const payload = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      propertyLocation: formData.get('propertyLocation') as string,
      inquiry: formData.get('inquiry') as string,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'leads'), payload);
      setSubmitted(true);
    } catch (err) {
      setError("An error occurred while submitting. Please try again.");
      console.error(err);
      handleFirestoreError(err, OperationType.CREATE, 'leads');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-luxury-cream">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-semibold mb-6 block">Inquire</span>
          <h2 className="text-4xl md:text-7xl serif leading-tight mb-8">Ready to maximize your <br /><span className="italic">portfolio?</span></h2>
          <p className="text-black/40 text-sm tracking-wide max-w-lg mx-auto font-light">
            An elite advisor will contact you within 24 hours to provide a comprehensive revenue projection.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form 
              ref={formRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
            >
              <div className="relative group">
                <input 
                  name="fullName"
                  type="text" 
                  required
                  placeholder="Full Name" 
                  className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-luxury-gold transition-colors font-light placeholder:text-black/20"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 group-focus-within:w-full" />
              </div>

              <div className="relative group">
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-luxury-gold transition-colors font-light placeholder:text-black/20"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 group-focus-within:w-full" />
              </div>

              <div className="relative group">
                <input 
                  name="phone"
                  type="tel" 
                  required
                  placeholder="Phone Number" 
                  className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-luxury-gold transition-colors font-light placeholder:text-black/20"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 group-focus-within:w-full" />
              </div>

              <div className="relative group">
                <input 
                  name="propertyLocation"
                  type="text" 
                  placeholder="Property Location" 
                  className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-luxury-gold transition-colors font-light placeholder:text-black/20"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 group-focus-within:w-full" />
              </div>

              <div className="md:col-span-2 relative group">
                <textarea 
                  name="inquiry"
                  rows={4}
                  placeholder="Tell us about your property" 
                  className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-luxury-gold transition-colors font-light resize-none placeholder:text-black/20"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 group-focus-within:w-full" />
              </div>

              {error && (
                <div className="md:col-span-2 text-red-500 text-xs text-center">
                  {error}
                </div>
              )}

              <div className="md:col-span-2 flex justify-center pt-8">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="group relative px-16 py-5 overflow-hidden rounded-full border border-black/10 hover:border-black transition-colors duration-500 disabled:opacity-50"
                >
                  <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-white transition-colors duration-500">
                    {loading ? 'Submitting...' : 'Submit Inquiry'}
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-black"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  />
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center"
            >
              <h3 className="text-3xl serif italic mb-4">Thank You.</h3>
              <p className="text-black/40 font-light tracking-wide">Our concierge team will review your application and be in touch shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-32 border-t border-black/5 pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-[9px] uppercase tracking-[0.3em] font-semibold opacity-30 text-center">
          <span>Riyadh</span>
          <span>Dubai</span>
          <span>Florida</span>
          <span>Bodrum</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-black/5 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col text-center md:text-left">
        <span className="text-sm tracking-[0.3em] font-medium uppercase">Vite</span>
        <span className="text-[10px] tracking-[0.2em] uppercase opacity-40">© 2026 Elite Hospitality Group</span>
      </div>
      <div className="flex gap-8 text-[10px] uppercase tracking-widest font-medium opacity-60">
        <a href="#" className="hover:opacity-100">Privacy</a>
        <a href="#" className="hover:opacity-100">Terms</a>
      </div>
    </footer>
  );
}

function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && user.email === 'abduzifa@gmail.com') {
      setLoading(true);
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const leadsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLeads(leadsData);
        setLoading(false);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'leads');
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="py-12 border-t border-black/5 px-6 md:px-12 flex justify-center">
        <button 
          onClick={handleLogin}
          className="text-[9px] uppercase tracking-widest opacity-20 hover:opacity-100 transition-opacity"
        >
          Partner Login
        </button>
      </div>
    );
  }

  if (user.email !== 'abduzifa@gmail.com') {
    return (
      <div className="py-12 border-t border-black/5 px-6 md:px-12 text-center text-[10px] uppercase tracking-widest opacity-40">
        Access Restricted to Authorized Personnel.
      </div>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-semibold mb-4 block">Dashboard</span>
            <h2 className="text-3xl serif italic">Lead Submissions</h2>
          </div>
          <button 
            onClick={() => auth.signOut()}
            className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100"
          >
            Sign Out
          </button>
        </div>

        {loading ? (
          <p className="text-center py-20 opacity-40 uppercase text-[10px] tracking-widest">Synchronizing leads...</p>
        ) : leads.length === 0 ? (
          <p className="text-center py-20 opacity-40 uppercase text-[10px] tracking-widest">No leads captured yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leads.map((lead) => (
              <div key={lead.id} className="p-8 bg-luxury-cream border border-black/5 rounded-xl space-y-4">
                <div className="flex justify-between items-start border-b border-black/5 pb-4">
                  <h3 className="serif text-xl italic">{lead.fullName}</h3>
                  <span className="text-[9px] uppercase tracking-widest opacity-40">
                    {lead.createdAt?.toDate().toLocaleDateString()}
                  </span>
                </div>
                <div className="space-y-2 text-sm font-light">
                  <p className="flex justify-between">
                    <span className="opacity-40 text-[9px] uppercase tracking-widest">Email:</span>
                    <span>{lead.email}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="opacity-40 text-[9px] uppercase tracking-widest">Phone:</span>
                    <span>{lead.phone}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="opacity-40 text-[9px] uppercase tracking-widest">Location:</span>
                    <span>{lead.propertyLocation || 'N/A'}</span>
                  </p>
                </div>
                <div className="pt-4 border-t border-black/5">
                  <span className="block text-[9px] uppercase tracking-widest opacity-40 mb-2">Inquiry:</span>
                  <p className="text-xs leading-relaxed italic">{lead.inquiry || 'No message provided.'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="bg-luxury-cream min-h-screen selection:bg-luxury-gold selection:text-white">
      <Nav />
      <Hero />
      <MarketShowcase />
      <ComparisonCalculator />
      <Services />
      <Contact />
      <AdminPanel />
      <Footer />
    </div>
  );
}

export default App;
