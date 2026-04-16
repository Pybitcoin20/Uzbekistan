import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { getSmartRecommendation } from '../services/geminiService';

export default function Hero() {
  const { t } = useTranslation();
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loadingRec, setLoadingRec] = useState(false);

  const handleGetRec = async () => {
    setLoadingRec(true);
    const rec = await getSmartRecommendation("Tashkent City Center");
    setRecommendation(rec);
    setLoadingRec(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with Uzbek Pattern */}
      <div className="absolute inset-0 uzbek-pattern opacity-40" />
      
      {/* Animated Silk Gradient Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-samarkand/10 blur-3xl rounded-full" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-silk/10 blur-3xl rounded-full" 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-samarkand/5 text-samarkand text-xs font-bold tracking-widest uppercase mb-6 border border-samarkand/10">
              {t('modern_silk_road')}
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-[0.9] tracking-tighter">
              {t('welcome')} <br />
              <span className="text-samarkand italic">Uzbekistan</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              {t('discover_uzbekistan')}
            </p>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-8 mb-12"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/40/40`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-samarkand flex items-center justify-center text-[10px] text-white font-bold">
                  +1k
                </div>
              </div>
              <div className="text-left">
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Sparkles key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                  1,200+ Sayohatlar rejalashtirildi
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Smart Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="glass p-2 rounded-3xl flex items-center shadow-2xl shadow-samarkand/10">
              <div className="flex-1 flex items-center px-4 gap-3">
                <Search className="w-5 h-5 text-samarkand" />
                <input 
                  type="text" 
                  placeholder={t('search_placeholder')}
                  className="w-full bg-transparent py-4 text-sm focus:outline-none font-medium"
                />
              </div>
              <button className="silk-gradient text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 hover:scale-[1.02] transition-transform active:scale-95">
                {t('explore')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* AI Recommendation Button */}
            <div className="mt-8">
              <button 
                onClick={handleGetRec}
                disabled={loadingRec}
                className="group relative px-6 py-3 rounded-2xl bg-white border border-samarkand/20 text-samarkand text-xs font-bold uppercase tracking-widest flex items-center gap-2 mx-auto hover:bg-samarkand hover:text-white transition-all shadow-lg"
              >
                {loadingRec ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Get Smart Recommendation
              </button>
              
              <AnimatePresence>
                {recommendation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 p-4 glass rounded-2xl border-samarkand/10 max-w-md mx-auto"
                  >
                    <p className="text-sm text-gray-600 font-light italic">
                      "{recommendation}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['Registan', 'Itchan Kala', 'Chorsu Bazaar', 'Plov Center'].map((tag) => (
                <button key={tag} className="px-4 py-2 rounded-full bg-white border border-gray-100 text-xs font-medium text-gray-500 hover:border-samarkand hover:text-samarkand transition-all cursor-pointer">
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-samarkand to-transparent" />
        <span className="text-[10px] uppercase tracking-widest font-bold text-samarkand/40">Scroll</span>
      </motion.div>
    </section>
  );
}
