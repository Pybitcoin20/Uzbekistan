import { useState } from 'react';
import { LogIn, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import SecuritySettings from './SecuritySettings';

export default function AuthButton() {
  const { user, loading, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />;

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            {user.photo_url ? (
              <img src={user.photo_url} alt={user.display_name || ''} className="w-8 h-8 rounded-full border border-samarkand" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-samarkand flex items-center justify-center text-white">
                <UserIcon className="w-4 h-4" />
              </div>
            )}
            <span className="text-sm font-medium hidden lg:block dark:text-white">{user.display_name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsSecurityOpen(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors group"
              title="Xavfsizlik"
            >
              <Shield className="w-5 h-5 text-gray-400 group-hover:text-samarkand" />
            </button>
            <button 
              onClick={handleLogout} 
              className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors group"
              title="Chiqish"
            >
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-samarkand text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
        >
          <LogIn className="w-4 h-4" />
          <span>Kirish</span>
        </button>
      )}

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <SecuritySettings
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />
    </>
  );
}
