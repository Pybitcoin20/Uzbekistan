import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { User, MapPin, Calendar, Star, Award, Settings, LogOut, ChevronRight, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

interface ProfileData {
  user: any;
  savedPlaces: any[];
  pointsHistory: any[];
}

export default function Profile() {
  const { user, logout } = useAuth();
  const [data, setData] = useState<ProfileData | null>(null);
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralStats, setReferralStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, codeRes, statsRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/referrals/code'),
          fetch('/api/referrals/stats')
        ]);
        
        if (profileRes.ok) setData(await profileRes.json());
        if (codeRes.ok) setReferralCode((await codeRes.json()).code);
        if (statsRes.ok) setReferralStats(await statsRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center">Iltimos, tizimga kiring.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-white/10 text-center"
            >
              <div className="relative inline-block mb-4">
                {user.photo_url ? (
                  <img src={user.photo_url} alt={user.display_name} className="w-24 h-24 rounded-full border-4 border-samarkand" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-samarkand flex items-center justify-center text-white text-3xl font-bold">
                    {user.display_name?.charAt(0)}
                  </div>
                )}
                {user.tier === 'premium' && (
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black p-1.5 rounded-full shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-serif font-bold dark:text-white">{user.display_name}</h2>
              <p className="text-gray-500 text-sm mb-6">{user.email}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Ballar</p>
                  <p className="text-xl font-bold text-samarkand">{user.points}</p>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Daraja</p>
                  <p className="text-xl font-bold text-samarkand capitalize">{user.tier}</p>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                {user.tier === 'free' && (
                  <Link 
                    to="/premium"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    Premiumga o'tish
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Chiqish
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-white/10"
            >
              <h3 className="text-lg font-serif font-bold dark:text-white mb-4">Yutuqlar</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-samarkand/5 rounded-xl">
                  <Award className="w-8 h-8 text-samarkand" />
                  <div>
                    <p className="text-sm font-bold dark:text-white">Ilk sayohat</p>
                    <p className="text-xs text-gray-500">Birinchi joyni band qildingiz</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved Places */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-serif font-bold dark:text-white">Saqlangan joylar</h3>
                <Link to="/explore" className="text-samarkand text-sm font-bold flex items-center gap-1">
                  Hammasini ko'rish <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.savedPlaces.map((place) => (
                  <motion.div 
                    key={place.id}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm"
                  >
                    <img src={place.images[0]} alt={place.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h4 className="font-bold dark:text-white">{place.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {place.city}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {data?.savedPlaces.length === 0 && (
                  <div className="col-span-full py-12 text-center bg-gray-100 dark:bg-white/5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10">
                    <p className="text-gray-500">Hali hech qanday joy saqlanmagan</p>
                  </div>
                )}
              </div>
            </section>

            {/* Points History */}
            <section>
              <h3 className="text-2xl font-serif font-bold dark:text-white mb-6">Ballar tarixi</h3>
              <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10">
                <div className="divide-y divide-gray-100 dark:divide-white/10">
                  {data?.pointsHistory.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-samarkand/10 rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 text-samarkand" />
                        </div>
                        <div>
                          <p className="text-sm font-bold dark:text-white">
                            {item.reason === 'booking_reward' ? 'Sayohat band qilish' : 'Sharh qoldirish'}
                          </p>
                          <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="text-green-500 font-bold">+{item.points}</span>
                    </div>
                  ))}
                  {data?.pointsHistory.length === 0 && (
                    <div className="p-8 text-center text-gray-500">Tarix mavjud emas</div>
                  )}
                </div>
              </div>
            </section>

            {/* Referral System */}
            <section>
              <h3 className="text-2xl font-serif font-bold dark:text-white mb-6">Do'stlarni taklif qiling</h3>
              <div className="bg-gradient-to-br from-samarkand to-blue-900 rounded-3xl p-8 text-white shadow-xl shadow-samarkand/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-bold mb-2">Har bir do'stingiz uchun 500 ball oling!</h4>
                    <p className="text-white/70 text-sm mb-6">
                      Do'stlaringiz ro'yxatdan o'tganda sizga 500 ball beriladi. Ballarni premium obuna va maxsus chegirmalarga almashtirishingiz mumkin.
                    </p>
                    <div className="flex items-center gap-2 bg-white/10 p-4 rounded-2xl border border-white/20">
                      <code className="text-2xl font-mono font-bold tracking-widest">{referralCode}</code>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(referralCode);
                          alert('Nusxa olindi!');
                        }}
                        className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        Nusxa olish
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="text-center">
                      <p className="text-4xl font-bold mb-1">{referralStats?.count || 0}</p>
                      <p className="text-xs uppercase tracking-widest opacity-60">Taklif qilinganlar</p>
                    </div>
                    <div className="mt-6 space-y-3">
                      {referralStats?.referrals.slice(0, 3).map((ref: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span>{ref.display_name}</span>
                          <span className="opacity-60">{new Date(ref.created_at).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
