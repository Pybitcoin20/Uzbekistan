import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Map as MapIcon, Maximize2, Layers, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

export default function ExploreMap() {
  const { t } = useTranslation();
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);

  // Mapbox would be initialized here if API key was provided
  // For now, we'll create a beautiful interactive placeholder

  return (
    <section id="explore" className="py-24 bg-cotton dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-samarkand font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <MapIcon className="w-4 h-4" />
              {t('explore')}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold dark:text-white">Interactive <span className="text-samarkand italic">Heritage</span> Map</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass p-1 rounded-2xl flex">
              {['Map', 'Satellite', 'Terrain'].map(mode => (
                <button key={mode} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'Map' ? 'bg-samarkand text-white shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}>
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 border-8 border-white dark:border-zinc-800">
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-blue-50 dark:bg-zinc-900 flex items-center justify-center">
            <div className="absolute inset-0 uzbek-pattern opacity-20" />
            <div className="relative z-10 text-center px-6">
              <div className="w-20 h-20 bg-samarkand/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Navigation className="w-8 h-8 text-samarkand" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2 dark:text-white">Interactive Map Engine</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto font-light">
                Explore 500+ historical sites, restaurants, and hotels across Uzbekistan.
                <br />
                <span className="text-xs font-bold text-samarkand mt-4 block uppercase tracking-widest">Mapbox Integration Ready</span>
              </p>
            </div>
            
            {/* Mock Markers */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-1/4 left-1/3 p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl flex items-center gap-3 border border-samarkand/20">
              <div className="w-10 h-10 rounded-xl silk-gradient flex items-center justify-center text-white">
                <MapIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-samarkand uppercase tracking-wider">Monument</div>
                <div className="text-sm font-bold dark:text-white">Registan Square</div>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute bottom-1/3 right-1/4 p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl flex items-center gap-3 border border-silk/20">
              <div className="w-10 h-10 rounded-xl bg-silk flex items-center justify-center text-white">
                <MapIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-silk uppercase tracking-wider">Restaurant</div>
                <div className="text-sm font-bold dark:text-white">Plov Center</div>
              </div>
            </motion.div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            {[Maximize2, Layers, Navigation].map((Icon, i) => (
              <button key={i} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gray-700 hover:bg-samarkand hover:text-white transition-all shadow-lg">
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Floating Category Filter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-8 py-4 rounded-3xl flex items-center gap-8 shadow-2xl border-white/40">
            {['All', 'Monuments', 'Food', 'Hotels', 'Bazaars'].map(cat => (
              <button key={cat} className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-samarkand transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
