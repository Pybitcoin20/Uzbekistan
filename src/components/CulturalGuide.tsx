import { useTranslation } from 'react-i18next';
import { BookOpen, ShieldCheck, Info, MessageSquare, Scale } from 'lucide-react';
import { motion } from 'motion/react';

const TIPS = [
  {
    title: "Bazaar Negotiation",
    icon: MessageSquare,
    content: "Always smile and offer 50-60% of the initial price. It's a social ritual, not just a transaction.",
    category: "negotiation"
  },
  {
    title: "Registration Rules",
    icon: ShieldCheck,
    content: "Keep all your hotel registration slips. You might be asked for them at the border when leaving.",
    category: "legal"
  },
  {
    title: "Photography",
    icon: Info,
    content: "Photography is now allowed in the Tashkent Metro! But avoid military sites and government buildings.",
    category: "safety"
  },
  {
    title: "Dining Etiquette",
    icon: BookOpen,
    content: "Bread (Non) is sacred. Never place it upside down or on the ground. Always break it by hand.",
    category: "etiquette"
  }
];

export default function CulturalGuide() {
  const { t } = useTranslation();

  return (
    <section id="guide" className="py-24 bg-slate-50 dark:bg-[#0B1220] relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
            <BookOpen className="w-4 h-4" />
            {t('cultural_guide')}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight dark:text-slate-50">
            Travel <span className="text-blue-600 italic">Wisely</span> & Respectfully
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-light">
            Essential knowledge for a smooth journey through the heart of the Silk Road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIPS.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl hover:bg-white dark:hover:bg-[#111827] transition-all group border-none shadow-sm hover:shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600/5 dark:bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <tip.icon className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-4 dark:text-slate-50">{tip.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed">
                {tip.content}
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/10">
                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600/40 dark:text-blue-400/40">
                  Category: {tip.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 p-8 rounded-3xl bg-blue-600 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-blue-600/20">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-xl mb-2">Legal & Safety Notice</h4>
            <p className="text-white/70 text-sm font-light leading-relaxed">
              Uzbekistan is very safe for tourists, but laws regarding medication (especially codeine-based) and drones are strict. Always check the official government portal before bringing specialized equipment.
            </p>
          </div>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-sm whitespace-nowrap hover:bg-blue-50 transition-all">
            Full Legal Guide
          </button>
        </div>
      </div>
    </section>
  );
}
