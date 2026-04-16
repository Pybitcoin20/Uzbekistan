import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Star, Zap, Map, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Premium() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/billing/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Zap, title: "Cheksiz AI Trip Planner", desc: "Kunlik cheklovlarsiz aqlli sayohat rejalarini tuzing" },
    { icon: Map, title: "Oflayn xaritalar", desc: "Internet bo'lmagan joylarda ham yo'lingizni yo'qotmang" },
    { icon: Star, title: "Eksklyuziv tavsiyalar", desc: "Faqat premium foydalanuvchilar uchun maxsus joylar" },
    { icon: ShieldCheck, title: "Ustuvor qo'llab-quvvatlash", desc: "Sayohat davomida 24/7 yordam" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-3 bg-yellow-400/10 rounded-2xl mb-4"
          >
            <Star className="w-8 h-8 text-yellow-500 fill-current" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold dark:text-white mb-4">
            Sayohatlaringizni <span className="text-samarkand">Premium</span> darajaga ko'taring
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            O'zbekiston bo'ylab eng yaxshi tajribaga ega bo'ling. Cheksiz imkoniyatlar va maxsus xizmatlar bilan sayohatingizni unutilmas qiling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="w-12 h-12 shrink-0 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10">
                  <f.icon className="w-6 h-6 text-samarkand" />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 rounded-[3rem] p-10 shadow-2xl border border-gray-100 dark:border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8">
              <div className="bg-samarkand/10 text-samarkand px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Eng ommabop
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-serif font-bold dark:text-white mb-2">Premium Obuna</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold dark:text-white">$9.99</span>
                <span className="text-gray-500">/ oyiga</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {["Barcha premium funksiyalar", "Istalgan vaqtda bekor qilish", "Yashirin to'lovlar yo'q", "24/7 VIP yordam"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-5 h-5 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpgrade}
              disabled={loading || user?.tier === 'premium'}
              className="w-full silk-gradient text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-samarkand/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 
               user?.tier === 'premium' ? 'Siz allaqachon Premiumdasiz' : 'Hoziroq boshlash'}
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-6">
              To'lovlar xavfsiz Stripe tizimi orqali amalga oshiriladi.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
