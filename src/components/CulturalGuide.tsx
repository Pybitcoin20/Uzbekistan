import { useTranslation } from 'react-i18next';
import { BookOpen, ShieldCheck, Info, MessageSquare, Scale } from 'lucide-react';
import { motion } from 'motion/react';

const TIPS = [
  {
    title: "The Art of the Bazaar",
    icon: MessageSquare,
    content: "Bargaining is a cherished social ritual. Smile, be patient, and aim for 50-70% of the opening price. It's a dance of respect, not just a purchase.",
    category: "negotiation"
  },
  {
    title: "Sanctity of the Bread",
    icon: BookOpen,
    content: "Uzbek 'Non' is sacred. Never place bread upside down, never let it touch the ground, and always break it by hand with friends.",
    category: "etiquette"
  },
  {
    title: "Documenting Memories",
    icon: Info,
    content: "Tashkent's legendary metro stations are now open for photography! Capture the underground palaces, but respect government boundaries.",
    category: "safety"
  },
  {
    title: "Digital Nomads & Laws",
    icon: ShieldCheck,
    content: "Keep your registration slips safely in your passport. This paper 'trail of hospitality' must be presented during your departure.",
    category: "legal"
  }
];

export default function CulturalGuide() {
  const { t } = useTranslation();

  return (
    <section id="guide" className="py-24 bg-slate-50 dark:bg-[#0B1220] relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 uzbek-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <BookOpen className="w-4 h-4" />
              Guidelines
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight dark:text-slate-50">
              The <span className="text-blue-600 italic">Traveler's</span> Etiquette
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 font-light text-lg">
              Master the local customs to unlock a deeper level of hospitality in the heart of Asia.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TIPS.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#111827] p-10 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="w-14 h-14 rounded-[1.25rem] bg-blue-50 dark:bg-blue-600/10 flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-all duration-500">
                <tip.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4 dark:text-slate-50 leading-tight">{tip.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-base font-light leading-relaxed">
                {tip.content}
              </p>
              <div className="mt-8 pt-8 border-t border-slate-50 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest font-black text-blue-600/40 dark:text-blue-400/60">
                  {tip.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="mt-20 p-10 md:p-14 rounded-[3.5rem] bg-[#111827] dark:bg-[#111827] text-white flex flex-col md:flex-row items-center gap-12 border border-white/5 relative overflow-hidden group shadow-3xl shadow-blue-500/10"
        >
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/30 transition-all duration-1000" />
          
          <div className="w-20 h-20 rounded-[2rem] bg-blue-600 flex items-center justify-center shrink-0 shadow-xl shadow-blue-600/40">
            <Scale className="w-9 h-9" />
          </div>
          <div className="flex-1">
            <h4 className="font-serif font-bold text-3xl mb-4">Legal & Safety Protocol</h4>
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
              While Uzbekistan is exceptionally welcoming, strict protocols exist for medications and specialized equipment like drones. Always consult our digital advisor before your journey.
            </p>
          </div>
          <button className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl shadow-white/5">
            View Knowledge Base
          </button>
        </motion.div>
      </div>
    </section>
  );
}
