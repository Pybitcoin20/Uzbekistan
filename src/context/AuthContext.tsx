import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  display_name?: string;
  photo_url?: string;
  role: string;
  tier: 'free' | 'premium';
  points: number;
  is_verified?: boolean;
}

interface Session {
  id: number;
  device_info: string;
  ip_address: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  sessions: Session[];
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string, referralCode?: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchSessions: () => Promise<void>;
  logoutAll: () => Promise<void>;
  forgotPassword: (email: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper for CSRF and Auth Fetch
const secureFetch = async (url: string, options: RequestInit = {}) => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const headers: any = {
    ...options.headers,
    'x-csrf-token': getCookie('csrf-token') || '',
    'Content-Type': 'application/json',
  };

  let res = await fetch(url, { ...options, headers });

  // Handle Token Expiration
  if (res.status === 401) {
    const data = await res.json();
    if (data.code === 'TOKEN_EXPIRED') {
      // Try refresh
      const refreshRes = await fetch('/api/auth/refresh', { 
        method: 'POST', 
        headers: { 'x-csrf-token': getCookie('csrf-token') || '' } 
      });
      if (refreshRes.ok) {
        // Retry original request
        res = await fetch(url, { ...options, headers });
      } else {
        // Refresh failed, logout
        window.location.href = '/';
      }
    }
  }

  return res;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await secureFetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const login = async (email: string, password: string) => {
    const res = await secureFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    setUser(data.user);
    closeAuthModal();
  };

  const register = async (email: string, password: string, displayName?: string, referralCode?: string) => {
    const res = await secureFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, displayName, referralCode }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    alert(data.message || 'Ro\'yxatdan o\'tdingiz. Emailingizni tasdiqlang.');
  };

  const logout = async () => {
    await secureFetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setSessions([]);
  };

  const fetchSessions = async () => {
    const res = await secureFetch('/api/auth/sessions');
    if (res.ok) {
      const data = await res.json();
      setSessions(data.sessions);
    }
  };

  const logoutAll = async () => {
    const res = await secureFetch('/api/auth/logout-all', { method: 'POST' });
    if (res.ok) {
      setUser(null);
      setSessions([]);
    }
  };

  const forgotPassword = async (email: string) => {
    const res = await secureFetch('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data.message;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthModalOpen, 
      sessions,
      openAuthModal, 
      closeAuthModal, 
      login, 
      register, 
      logout,
      fetchSessions,
      logoutAll,
      forgotPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
