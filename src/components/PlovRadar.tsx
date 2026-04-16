import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Utensils, Clock, MapPin, Star, Trophy, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ShareCard from './ShareCard';

const PLOV_PLACES = [
  {
    name: "Central Asian Plov Center",
    city: "Tashkent",
    score: 9.8,
    bestTime: "11:00 AM - 1:00 PM",
    specialty: "Wedding Plov",
    image: "https://picsum.photos/seed/plov1/800/600",
    status: "Ready Now",
    isLive: true
  },
  {
    name: "Samarkand Osh Markazi",
    city: "Samarkand",
    score: 9.5,
    bestTime: "12:00 PM - 2:00 PM",
    specialty: "Samarkand Layered Plov",
    image: "https://picsum.photos/seed/plov2/800/600",
    status: "Cooking...",
    isLive: false
  },
  {
    name: "Bukhara Sofi Osh",
    city: "Bukhara",
    score: 9.2,
    bestTime: "11:30 AM - 1:30 PM",
    specialty: "Osh-i-Sofi",
    image: "https://picsum.photos/seed/plov3/800/600",
    status: "Sold Out",
    isLive: false
  }
];

export default function PlovRadar() {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState('All');
  const [sharingPlace, setSharingPlace] = useState<any>(null);

  const filteredPlaces = selectedCity === 'All' 
    ? PLOV_PLACES 
    : PLOV_PLACES.filter(p => p.city === selectedCity);

  return (
    <section id="plov" className="py-24 bg-white dark:bg-[#0B1220] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-50 dark:from-[#111827] to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <Utensils className="w-4 h-4" />
              {t('plov_radar')}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight dark:text-slate-50">
              The Ultimate <span className="text-blue-600 italic">Plov</span> Ranking
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 font-light">
              Uzbekistan's national dish is an art form. We've ranked the best places based on authenticity, timing, and regional style.
            </p>
          </div>
          <div className="flex gap-2 bg-slate-50 dark:bg-white/5 p-1 rounded-2xl">
            {['All', 'Tashkent', 'Samarkand', 'Bukhara'].map(city => (
              <button 
                key={city} 
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCity === city ? 'bg-white dark:bg-[#111827] shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-blue-600'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place, index) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl z-20 shadow-lg shadow-blue-600/20">
                #{index + 1}
              </div>

              {place.isLive && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  Live Status
                </div>
              )}
              
              <div className="bg-white dark:bg-[#111827] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-1 text-blue-400 mb-1">
                        <Trophy className="w-3 h-3 fill-current" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Top Rated</span>
                      </div>
                      <h3 className="text-white font-serif font-bold text-lg">{place.name}</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                      <span className="text-white font-bold text-sm">{place.score}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        {place.city}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        {place.bestTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold block mb-1">Status</span>
                        <p className={`font-bold text-sm ${
                          place.status === 'Ready Now' ? 'text-green-600' : 
                          place.status === 'Sold Out' ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'
                        }`}>{place.status}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold block mb-1">Signature</span>
                        <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{place.specialty}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setSharingPlace(place)}
                      className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Do'stlar bilan ulashish
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {sharingPlace && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSharingPlace(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div className="relative">
              <ShareCard 
                title={sharingPlace.name}
                description={`${sharingPlace.city} shahridagi eng mazali ${sharingPlace.specialty}!`}
                image={sharingPlace.image}
                url={window.location.href}
                type="plov"
                score={sharingPlace.score}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
