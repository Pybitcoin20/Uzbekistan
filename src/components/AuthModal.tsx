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
  const { login, register, forgotPassword } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setError('Google login is currently being migrated to secure custom backend. Please use email for now.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'register') {
        await register(email, password, displayName, referralCode);
        setMessage('Welcome to the Heritage! Please verify your email to unlock premium rewards.');
      } else if (mode === 'login') {
        await login(email, password);
        onClose();
      } else if (mode === 'forgot') {
        const msg = await forgotPassword(email);
        setMessage(msg);
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
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal container */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 20 }}
           className="relative w-full max-w-xl flex flex-col md:flex-row bg-white dark:bg-[#111827] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/5"
        >
          {/* Sidebar / Social Proof */}
          <div className="hidden md:flex flex-col justify-between w-64 bg-blue-600 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 uzbek-pattern opacity-10" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-12">
                <span className="text-white font-serif font-bold text-2xl">U</span>
              </div>
              <h3 className="text-2xl font-serif font-bold leading-tight mb-4">
                Explore the Ancient heart of Asia.
              </h3>
              <p className="text-white/80 text-sm font-light">
                Join 10,000+ travelers uncovering the mysteries of the Silk Road.
              </p>
            </div>
            <div className="relative z-10 pt-8 border-t border-white/10">
              <div className="flex -space-x-2 mb-4">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i} 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    className="w-8 h-8 rounded-full border-2 border-blue-600 object-cover" 
                    referrerPolicy="no-referrer"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-blue-600 flex items-center justify-center text-[10px] font-bold">
                  +10k
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 italic">
                Uzbekistan 🇺🇿 Heritage
              </p>
            </div>
          </div>

          <div className="flex-1 p-8 pt-12 relative overflow-y-auto max-h-[90vh]">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tabs */}
            {mode !== 'forgot' && (
              <div className="flex gap-8 mb-8 border-b border-slate-100 dark:border-white/5">
                {(['login', 'register'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setMode(tab);
                      setError(null);
                      setMessage(null);
                    }}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                      mode === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab === 'login' ? 'Login' : 'Register'}
                    {mode === tab && (
                      <motion.div 
                        layoutId="auth-tab" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" 
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold dark:text-slate-50">
                {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Join the Journey' : 'Reset Password'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {mode === 'login' ? 'Enter your credentials to continue.' : 
                 mode === 'register' ? 'Create an account to start your adventure.' : 
                 'Enter your email to receive a reset link.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              {mode !== 'forgot' && (
                <>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  {mode === 'register' && (
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        required
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  )}
                </>
              )}

              {mode === 'register' && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Referral Code (Optional)"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between px-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-blue-600 transition-colors">Remember me</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
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
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:scale-100"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    {mode === 'login' ? 'Login' : mode === 'register' ? 'Register Now' : 'Send Reset Link'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-[#111827] px-4 text-slate-400 font-bold tracking-widest">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm font-bold dark:text-slate-200 flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <Chrome className="w-5 h-5 text-blue-600" />
              Continue with Google
            </button>

            {mode === 'forgot' && (
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setMode('login')}
                  className="text-xs text-blue-600 hover:underline font-bold"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
