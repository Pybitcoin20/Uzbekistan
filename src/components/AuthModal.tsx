import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Chrome, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setError('Google login is currently being migrated to custom backend.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === 'register') {
        await register(email, password, displayName);
        onClose();
      } else if (mode === 'login') {
        await login(email, password);
        onClose();
      } else if (mode === 'forgot') {
        // Implement forgot password logic on backend if needed
        setMessage('Parolni tiklash funksiyasi tez orada qo\'shiladi.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 pt-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 silk-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-samarkand/20">
                <span className="text-white font-serif font-bold text-3xl">U</span>
              </div>
              <h2 className="text-2xl font-serif font-bold dark:text-white">
                {mode === 'login' ? 'Xush kelibsiz' : mode === 'register' ? 'Hisob yaratish' : 'Parolni tiklash'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                {mode === 'login' ? 'Tizimga kirish uchun ma\'lumotlaringizni kiriting' : 
                 mode === 'register' ? 'O\'zbekiston bo\'ylab sayohatni biz bilan boshlang' : 
                 'Emailingizni kiriting va biz sizga havola yuboramiz'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="To'liq ismingiz"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-sm dark:text-white focus:ring-2 focus:ring-samarkand outline-none transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="Email manzilingiz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-sm dark:text-white focus:ring-2 focus:ring-samarkand outline-none transition-all"
                />
              </div>

              {mode !== 'forgot' && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="Parol"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-sm dark:text-white focus:ring-2 focus:ring-samarkand outline-none transition-all"
                  />
                </div>
              )}

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              {message && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{message}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full silk-gradient text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-samarkand/20 disabled:opacity-50 disabled:scale-100"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    {mode === 'login' ? 'Kirish' : mode === 'register' ? 'Ro\'yxatdan o\'tish' : 'Yuborish'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {mode === 'login' && (
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setMode('forgot')}
                  className="text-xs text-samarkand hover:underline font-medium"
                >
                  Parolni unutdingizmi?
                </button>
              </div>
            )}

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100 dark:border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-4 text-gray-400 font-bold tracking-widest">Yoki</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-sm font-bold dark:text-white flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <Chrome className="w-5 h-5 text-samarkand" />
              Google orqali kirish
            </button>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {mode === 'login' ? 'Hisobingiz yo\'qmi?' : 'Hisobingiz bormi?'}
                <button
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login');
                    setError(null);
                    setMessage(null);
                  }}
                  className="ml-2 text-samarkand font-bold hover:underline"
                >
                  {mode === 'login' ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
