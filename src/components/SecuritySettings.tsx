import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Smartphone, Globe, LogOut, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecuritySettings({ isOpen, onClose }: Props) {
  const { sessions, fetchSessions, logoutAll, loading } = useAuth();
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSessions();
    }
  }, [isOpen]);

  const handleLogoutAll = async () => {
    if (!window.confirm("Barcha qurilmalardan chiqmoqchimisiz?")) return;
    setIsActionLoading(true);
    try {
      await logoutAll();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 pt-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 silk-gradient rounded-xl flex items-center justify-center shadow-lg shadow-samarkand/20">
                <Shield className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold dark:text-white">Xavfsizlik sozlamalari</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Faol seanslar va qurilmalarni boshqarish</p>
              </div>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-samarkand mb-4" />
                  <p className="text-gray-500">Seanslar yuklanmoqda...</p>
                </div>
              ) : (
                sessions.map((session) => (
                  <div 
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-lg flex items-center justify-center">
                        {session.device_info.toLowerCase().includes('mobile') ? (
                          <Smartphone className="w-5 h-5 text-samarkand" />
                        ) : (
                          <Globe className="w-5 h-5 text-samarkand" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold dark:text-white truncate max-w-[200px]">
                          {session.device_info || 'Noma\'lum qurilma'}
                        </p>
                        <p className="text-xs text-gray-500">{session.ip_address} • {new Date(session.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded-md">
                      Faol
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10">
              <button
                onClick={handleLogoutAll}
                disabled={isActionLoading}
                className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {isActionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <LogOut className="w-5 h-5" />
                    Barcha qurilmalardan chiqish
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-bold">
                Bu amal barcha joriy seanslarni yakunlaydi
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
