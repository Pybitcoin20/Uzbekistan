import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AuthButton() {
  const { user, loading } = useAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading) return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />;

  return user ? (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-samarkand" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-samarkand flex items-center justify-center text-white">
            <UserIcon className="w-4 h-4" />
          </div>
        )}
        <span className="text-sm font-medium hidden md:block">{user.displayName}</span>
      </div>
      <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <LogOut className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  ) : (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 px-4 py-2 bg-samarkand text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20"
    >
      <LogIn className="w-4 h-4" />
      <span>Sign In</span>
    </button>
  );
}
