import { useTranslation } from 'react-i18next';
import { Utensils, Clock, MapPin, Star, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

const PLOV_PLACES = [
  {
    name: "Central Asian Plov Center",
    city: "Tashkent",
    score: 9.8,
    bestTime: "11:00 AM - 1:00 PM",
    specialty: "Wedding Plov",
    image: "https://picsum.photos/seed/plov1/800/600"
  },
  {
    name: "Samarkand Osh Markazi",
    city: "Samarkand",
    score: 9.5,
    bestTime: "12:00 PM - 2:00 PM",
    specialty: "Samarkand Layered Plov",
    image: "https://picsum.photos/seed/plov2/800/600"
  },
  {
    name: "Bukhara Sofi Osh",
    city: "Bukhara",
    score: 9.2,
    bestTime: "11:30 AM - 1:30 PM",
    specialty: "Osh-i-Sofi",
    image: "https://picsum.photos/seed/plov3/800/600"
  }
];

export default function PlovRadar() {
  const { t } = useTranslation();

  return (
    <section id="plov" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-cotton to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-silk font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <Utensils className="w-4 h-4" />
              {t('plov_radar')}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              The Ultimate <span className="text-samarkand italic">Plov</span> Ranking
            </h2>
            <p className="text-gray-500 mt-4 font-light">
              Uzbekistan's national dish is an art form. We've ranked the best places based on authenticity, timing, and regional style.
            </p>
          </div>
          <div className="flex gap-2">
            {['Tashkent', 'Samarkand', 'Bukhara'].map(city => (
              <button key={city} className="px-6 py-2 rounded-full border border-gray-100 text-sm font-medium hover:border-samarkand hover:text-samarkand transition-all">
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PLOV_PLACES.map((place, index) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 silk-gradient rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl z-20 shadow-lg">
                #{index + 1}
              </div>
              
              <div className="bg-cotton rounded-3xl overflow-hidden border border-gray-100 group-hover:shadow-2xl group-hover:shadow-samarkand/10 transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-1 text-silk mb-1">
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
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4 text-samarkand" />
                        {place.city}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4 text-samarkand" />
                        {place.bestTime}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Signature Dish</span>
                      <p className="font-medium text-gray-800">{place.specialty}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
