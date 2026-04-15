import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Ensure user profile exists in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            role: 'user',
            createdAt: serverTimestamp()
          });
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
