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
              The Sacred <span className="text-blue-600 italic">Plov</span> Hierarchy
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 font-light text-lg">
              In Uzbekistan, Plov is not just a dish; it is a philosophy, a ritual, and a legacy. Our real-time radar tracks the most authentic hearths across the ancient Silk Road.
            </p>
          </div>
          <div className="flex gap-2 bg-slate-50 dark:bg-white/5 p-1 rounded-2xl border border-slate-100 dark:border-white/5">
            {['All', 'Tashkent', 'Samarkand', 'Bukhara'].map(city => (
              <button 
                key={city} 
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedCity === city ? 'bg-white dark:bg-[#111827] shadow-lg text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 hover:text-blue-600'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {filteredPlaces.map((place, index) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -top-5 -left-5 w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl z-20 shadow-2xl shadow-blue-600/40 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                {index + 1}
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 group-hover:shadow-3xl group-hover:shadow-blue-500/10 transition-all duration-500">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {place.isLive && (
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse border border-white/20">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      Live Cauldron
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="flex-1 mr-4">
                      <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <Trophy className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Heritage Grade</span>
                      </div>
                      <h3 className="text-white font-serif font-bold text-2xl leading-tight">{place.name}</h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 shadow-2xl">
                      <span className="text-white font-black text-lg">{place.score}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {place.city}
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium">
                        <Clock className="w-4 h-4 text-blue-600" />
                        {place.bestTime}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50 dark:border-white/5">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1 italic">Vibe Check</span>
                        <p className={`font-bold text-sm ${
                          place.status === 'Ready Now' ? 'text-green-500' : 
                          place.status === 'Sold Out' ? 'text-red-500' : 'text-blue-600'
                        }`}>{place.status}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1 italic">Secret Dish</span>
                        <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{place.specialty}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setSharingPlace(place)}
                      className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-slate-50 hover:bg-blue-600 dark:bg-white/5 dark:hover:bg-blue-600 text-slate-600 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-sm"
                    >
                      <Share2 className="w-4 h-4" />
                      Share the Legacy
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
