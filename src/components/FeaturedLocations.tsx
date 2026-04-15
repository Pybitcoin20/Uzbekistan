import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocationCard from './LocationCard';
import { Category } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_LOCATIONS } from '../data/locations';
import { MapPin, Filter } from 'lucide-react';

export default function FeaturedLocations() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const filteredLocations = activeCategory === 'all' 
    ? ALL_LOCATIONS 
    : ALL_LOCATIONS.filter(loc => loc.category === activeCategory);

  const categories: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: 'All Places' },
    { id: 'monument', label: 'Monuments' },
    { id: 'bazaar', label: 'Bazaars' },
    { id: 'nature', label: 'Nature' },
    { id: 'museum', label: 'Museums' }
  ];

  return (
    <section id="explore" className="py-24 bg-cotton dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-samarkand font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <span className="w-8 h-px bg-samarkand" />
              {t('explore')}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight dark:text-white">
              Timeless <span className="text-samarkand italic">Heritage</span> Sites
            </h2>
            <p className="mt-4 text-gray-500 dark:text-white/40 font-light max-w-lg">
              Explore the most iconic historical monuments, vibrant bazaars, and breathtaking natural wonders of Uzbekistan in stunning 4K detail.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border ${
                  activeCategory === cat.id 
                    ? 'bg-samarkand text-white border-samarkand shadow-lg shadow-samarkand/20' 
                    : 'bg-white dark:bg-white/5 text-gray-400 border-gray-100 dark:border-white/10 hover:border-samarkand hover:text-samarkand'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredLocations.map((loc, index) => (
              <motion.div
                key={loc.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <LocationCard location={loc} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
