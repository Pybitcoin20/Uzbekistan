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
              Your Personalized <span className="text-blue-600 italic">Silk Road</span> Journey
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto">
              Tell us how long you're staying, and our AI concierge will craft a perfect day-by-day itinerary tailored to Uzbekistan's unique rhythm.
            </p>
          </div>

          <div className="glass p-8 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Duration (Days)</label>
                <div className="flex items-center gap-4">
                  {[3, 5, 7, 10].map(d => (
                    <button
                      key={d}
                      onClick={() => setDays(d)}
                      className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                        days === d ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full md:w-auto bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Itinerary
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {itinerary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {itinerary.map((item, idx) => (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group glass p-8 rounded-3xl hover:bg-white dark:hover:bg-[#111827] transition-all border-none shadow-sm hover:shadow-xl"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600 flex flex-col items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20">
                        <span className="text-[10px] uppercase font-bold opacity-70">Day</span>
                        <span className="text-2xl font-serif font-bold">{item.day}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-blue-600 dark:text-slate-50 transition-colors">
                          {item.title}
                        </h3>
                        <ul className="space-y-3">
                          {item.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400 font-light">
                              <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
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
