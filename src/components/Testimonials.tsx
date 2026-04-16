import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Travel Blogger",
    text: "Uzbekistan Heritage platformasi orqali rejalashtirgan sayohatim unutilmas bo'ldi. AI Trip Planner juda aniq va foydali tavsiyalar berdi!",
    avatar: "https://picsum.photos/seed/sarah/100/100",
    rating: 5
  },
  {
    name: "Azamat Karimov",
    role: "Local Guide",
    text: "Vendor sifatida ushbu ekotizimga qo'shilganimdan juda mamnunman. Mijozlar oqimi sezilarli darajada oshdi.",
    avatar: "https://picsum.photos/seed/azamat/100/100",
    rating: 5
  },
  {
    name: "Elena Petrova",
    role: "History Enthusiast",
    text: "Madaniy meros haqidagi ma'lumotlar juda boy va qiziqarli. Har bir joyning tarixi chuqur yoritilgan.",
    avatar: "https://picsum.photos/seed/elena/100/100",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold dark:text-white mb-4">
            Sayohatlarimiz haqida <span className="text-samarkand italic">fikrlar</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Minglab baxtli sayohatchilar va hamkorlarimizning samimiy e'tiroflari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-sm relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-samarkand/5" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 italic leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold dark:text-white text-sm">{t.name}</h4>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
