import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, Clock, Navigation, Sparkles, Image as ImageIcon, ArrowLeft, Info } from 'lucide-react';
import { getCulturalInsights } from '../services/geminiService';

const IMAM_BUKHARI_DATA = {
  id: 'imam-al-bukhari',
  name: "Imam Al-Bukhari Complex",
  city: "Samarkand",
  category: "Religious / Historical",
  lat: 39.8122,
  lng: 66.9389,
  rating: 4.9,
  reviewCount: 12450,
  description: "The Imam Al-Bukhari Complex is one of the most significant pilgrimage sites in the Islamic world. It is the final resting place of Muhammad ibn Ismail al-Bukhari, the author of 'Sahih al-Bukhari', the most authentic collection of Hadiths. The complex was completely reconstructed in 1998, blending traditional oriental architecture with modern craftsmanship, featuring a magnificent blue-domed mausoleum, a mosque, and a library.",
  images: [
    "https://picsum.photos/seed/bukhari1/1200/800",
    "https://picsum.photos/seed/bukhari2/800/600",
    "https://picsum.photos/seed/bukhari3/800/600",
    "https://picsum.photos/seed/bukhari4/800/600"
  ],
  bestTime: "Morning (08:00 AM - 10:00 AM)",
  nearby: [
    { name: "Makhdumi Azam Mausoleum", rating: 4.7, distance: "0.4km" },
    { name: "Local Tea House", rating: 4.5, distance: "0.2km" }
  ]
};

export default function ImamAlBukhariPage() {
  const [insights, setInsights] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      const insight = await getCulturalInsights(IMAM_BUKHARI_DATA.name);
      // Split into bullet points for better UI
      setInsights(insight.split('. ').filter(s => s.length > 10).slice(0, 4));
      setLoadingAI(false);
    }
    fetchInsights();
    
    // SEO
    document.title = `${IMAM_BUKHARI_DATA.name} | Uzbekistan Smart Travel`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', IMAM_BUKHARI_DATA.description.substring(0, 160));
  }, []);

  return (
    <div className="min-h-screen bg-cotton pb-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src={IMAM_BUKHARI_DATA.images[0]} 
          alt={IMAM_BUKHARI_DATA.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-8 left-8">
          <button 
            onClick={() => window.history.back()}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-12 left-0 w-full">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-samarkand text-white text-[10px] font-bold uppercase tracking-widest">
                  Must Visit 🇺🇿
                </span>
                <div className="flex items-center gap-1 text-silk">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{IMAM_BUKHARI_DATA.rating}</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">
                {IMAM_BUKHARI_DATA.name}
              </h1>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-samarkand" />
                  {IMAM_BUKHARI_DATA.city}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-samarkand" />
                  Best time: {IMAM_BUKHARI_DATA.bestTime}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description Card */}
            <div className="glass p-8 md:p-12 rounded-[2.5rem] shadow-xl">
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-samarkand" />
                About the Sanctuary
              </h2>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                {IMAM_BUKHARI_DATA.description}
              </p>
            </div>

            {/* Photo Gallery */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-samarkand" />
                Visual Journey
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {IMAM_BUKHARI_DATA.images.slice(1).map((img, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="aspect-square rounded-3xl overflow-hidden shadow-lg"
                  >
                    <img src={img} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-samarkand/5 border border-samarkand/10 p-8 md:p-12 rounded-[2.5rem]">
              <div className="flex items-center gap-2 text-samarkand font-bold text-xs uppercase tracking-[0.2em] mb-6">
                <Sparkles className="w-4 h-4" />
                AI Cultural Insights
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loadingAI ? (
                  [1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-samarkand/10 animate-pulse rounded-2xl" />)
                ) : (
                  insights.map((insight, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-samarkand/10 flex items-center justify-center text-samarkand shrink-0 font-bold text-xs">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {insight}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Map Card */}
            <div className="glass p-6 rounded-[2rem] shadow-lg sticky top-24">
              <div className="aspect-square bg-gray-100 rounded-2xl mb-6 relative overflow-hidden border border-gray-200">
                {/* Placeholder for Mapbox/Google Maps */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <MapPin className="w-12 h-12 text-samarkand mb-4 animate-bounce" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Interactive Map Ready</p>
                  <p className="text-[10px] text-gray-400 mt-2">{IMAM_BUKHARI_DATA.lat}, {IMAM_BUKHARI_DATA.lng}</p>
                </div>
              </div>
              
              <button className="w-full silk-gradient text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-samarkand/20">
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Nearby Gems</h4>
                <div className="space-y-4">
                  {IMAM_BUKHARI_DATA.nearby.map(place => (
                    <div key={place.name} className="flex items-center justify-between group cursor-pointer">
                      <div>
                        <p className="text-sm font-medium group-hover:text-samarkand transition-colors">{place.name}</p>
                        <p className="text-[10px] text-gray-400">{place.distance} away</p>
                      </div>
                      <div className="flex items-center gap-1 text-silk text-xs font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {place.rating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
