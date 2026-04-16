import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import AuthButton from './AuthButton';
import ThemeToggle from './ThemeToggle';
import { Map, Compass, Utensils, BookOpen, User, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';
  const isVendor = user?.role === 'vendor';

  const navItems = [
    { name: t('explore'), icon: Compass, href: '/#explore' },
    { name: t('plov_radar'), icon: Utensils, href: '/#plov' },
    { name: t('cultural_guide'), icon: BookOpen, href: '/#guide' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl shadow-black/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 silk-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-serif font-bold text-xl">U</span>
          </div>
          <span className="font-serif font-bold text-lg tracking-tight hidden sm:block dark:text-white">
            Uzbekistan <span className="text-samarkand">Heritage</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-white/60 hover:text-samarkand dark:hover:text-silk transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </a>
          ))}
          
          {user && (
            <div className="flex items-center gap-4">
              {user.tier === 'premium' && (
                <span className="px-2 py-0.5 bg-yellow-400 text-[10px] font-bold text-black rounded-full uppercase tracking-widest">
                  Premium
                </span>
              )}
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-white/60 hover:text-samarkand transition-colors"
              >
                <User className="w-4 h-4" />
                Profil
              </Link>
            </div>
          )}

          {(isVendor || isAdmin) && (
            <Link
              to="/vendor"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-white/60 hover:text-samarkand transition-colors"
            >
              <Settings className="w-4 h-4" />
              Vendor
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-2 text-sm font-medium text-samarkand dark:text-silk hover:opacity-80 transition-all"
            >
              <Settings className="w-4 h-4" />
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <LanguageSwitcher />
          <div className="h-6 w-px bg-gray-200 dark:bg-white/10" />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
