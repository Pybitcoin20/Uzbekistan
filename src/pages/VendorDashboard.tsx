import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, MapPin, Calendar, TrendingUp, DollarSign, Plus, Edit2, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function VendorDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/vendor/dashboard');
        if (res.ok) {
          const dashboardData = await res.json();
          setData(dashboardData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>;
  if (user?.role !== 'vendor' && user?.role !== 'admin') return <div className="min-h-screen flex items-center justify-center">Ruxsat berilmagan.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold dark:text-white">Vendor Boshqaruv Paneli</h1>
            <p className="text-gray-500">Joylar va bandlovlarni boshqarish</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-samarkand text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
            <Plus className="w-5 h-5" />
            Yangi joy qo'shish
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Jami bandlovlar', value: data?.stats?.total_bookings || 0, icon: Calendar, color: 'blue' },
            { label: 'Umumiy daromad', value: `$${data?.stats?.total_revenue || 0}`, icon: DollarSign, color: 'green' },
            { label: 'Faol joylar', value: data?.locations?.length || 0, icon: MapPin, color: 'purple' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}-500/10 text-${stat.color}-500`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/10 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
              <h3 className="font-serif font-bold dark:text-white">Oxirgi bandlovlar</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="divide-y divide-gray-100 dark:divide-white/10">
              {data?.bookings.map((booking: any) => (
                <div key={booking.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div>
                    <p className="text-sm font-bold dark:text-white">{booking.user_name}</p>
                    <p className="text-xs text-gray-500">{booking.location_name} • {new Date(booking.booking_date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-500">${booking.total_price}</p>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{booking.status}</span>
                  </div>
                </div>
              ))}
              {data?.bookings.length === 0 && (
                <div className="p-12 text-center text-gray-500">Hali bandlovlar yo'q</div>
              )}
            </div>
          </section>

          {/* My Locations */}
          <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/10 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
              <h3 className="font-serif font-bold dark:text-white">Mening joylarim</h3>
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <div className="divide-y divide-gray-100 dark:divide-white/10">
              {data?.locations.map((loc: any) => (
                <div key={loc.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={loc.images[0]} alt={loc.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <p className="text-sm font-bold dark:text-white">{loc.name}</p>
                      <p className="text-xs text-gray-500">{loc.city} • ${loc.price_per_visit}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
              {data?.locations.length === 0 && (
                <div className="p-12 text-center text-gray-500">Joylar qo'shilmagan</div>
              )}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
