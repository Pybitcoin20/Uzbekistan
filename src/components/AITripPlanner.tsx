import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Calendar, MapPin, Loader2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateItinerary } from '../services/geminiService';

interface DayPlan {
  day: number;
  title: string;
  activities: string[];
}

export default function AITripPlanner() {
  const { t } = useTranslation();
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<DayPlan[] | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateItinerary(days, ["History", "Food", "Architecture"]);
    setItinerary(result);
    setLoading(false);
  };

  return (
    <section id="planner" className="py-24 bg-white dark:bg-[#0B1220] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-3xl rounded-full -mr-48 -mt-48" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Planning
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 dark:text-slate-50">
              Your Ethereal <span className="text-blue-600 italic">Silk Road</span> Voyage
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light text-lg max-w-2xl mx-auto leading-relaxed">
              Design a journey that resonates with your soul. Select your duration, and our AI oracle will weave an intricate tapestry of ancient wonders and modern culture.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] p-12 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-3xl shadow-blue-500/5 mb-16 relative overflow-hidden group">
             {/* Background Decoration */}
             <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full group-hover:bg-blue-600/10 transition-all duration-1000" />
             
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Voyage Duration</label>
                <div className="flex items-center gap-4">
                  {[3, 5, 7, 10].map(d => (
                    <button
                      key={d}
                      onClick={() => setDays(d)}
                      className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all duration-500 ${
                        days === d ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40 scale-105' : 'bg-slate-50 dark:bg-white/5 text-slate-500 hover:bg-white dark:hover:bg-white/10 hover:shadow-xl'
                      }`}
                    >
                      {d} <span className="text-[10px] font-light ml-1 opacity-70">Days</span>
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full md:w-auto bg-black dark:bg-blue-600 text-white px-14 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-105 transition-all duration-500 shadow-2xl shadow-blue-600/20 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Weave Itinerary
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {itinerary && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="space-y-10"
              >
                {itinerary.map((item, idx) => (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="group bg-white dark:bg-[#111827] p-10 rounded-[3rem] border border-slate-50 dark:border-white/5 shadow-sm hover:shadow-3xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="flex flex-col md:flex-row items-start gap-10">
                      <div className="w-20 h-20 rounded-[1.75rem] bg-blue-600 flex flex-col items-center justify-center text-white shrink-0 shadow-2xl shadow-blue-600/30 group-hover:scale-110 transition-transform duration-500">
                        <span className="text-[10px] uppercase font-black tracking-widest opacity-60">Day</span>
                        <span className="text-3xl font-serif font-black">{item.day}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif font-bold mb-6 group-hover:text-blue-600 dark:text-slate-50 transition-colors duration-500 leading-tight">
                          {item.title}
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {item.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-4 text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5 shrink-0" />
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
