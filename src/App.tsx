/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedLocations from './components/FeaturedLocations';
import ExploreMap from './components/ExploreMap';
import AITripPlanner from './components/AITripPlanner';
import PlovRadar from './components/PlovRadar';
import CulturalGuide from './components/CulturalGuide';
import Testimonials from './components/Testimonials';
import ErrorBoundary from './components/ErrorBoundary';
import ImamAlBukhariPage from './components/ImamAlBukhariPage';
import AdminDashboard from './components/AdminDashboard';
import Profile from './pages/Profile';
import Premium from './pages/Premium';
import VendorDashboard from './pages/VendorDashboard';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal';
import { useAuth } from './hooks/useAuth';
import { motion, useScroll, useSpring } from 'motion/react';

function AppContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { isAuthModalOpen, closeAuthModal } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220] selection:bg-blue-500/20 selection:text-blue-600 transition-colors duration-300">
      <Helmet>
        <title>Uzbekistan Heritage | Silk Road Discovery Ecosystem</title>
        <meta name="description" content="Discover the ancient heart of Asia. Smart travel ecosystem for Uzbekistan heritage, cultural guides, and the ultimate plov radar." />
        <meta name="keywords" content="Uzbekistan, Travel, Heritage, Samarkand, Bukhara, Khiva, Plov, Silk Road" />
        <meta property="og:title" content="Uzbekistan Heritage | Silk Road Discovery" />
        <meta property="og:description" content="Explore ancient monuments and modern culture in the heart of the Silk Road." />
        <meta property="og:image" content="https://picsum.photos/seed/uzbekistan/1200/630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations/imam-al-bukhari" element={<ImamAlBukhariPage />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/vendor" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>

      <footer className="py-20 bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 uzbek-pattern opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-2xl">U</span>
                </div>
                <span className="font-serif font-bold text-2xl tracking-tight dark:text-slate-50">
                  Uzbekistan <span className="text-blue-600">Heritage</span>
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-md font-light leading-relaxed">
                A premium travel ecosystem dedicated to preserving and showcasing the rich cultural heritage of Uzbekistan through modern technology and smart services.
              </p>
            </div>
            
            <div>
              <h4 className="font-serif font-bold text-lg mb-6 dark:text-slate-50">Quick Links</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm font-light">
                <li><a href="#explore" className="hover:text-blue-600 transition-colors">Explore Map</a></li>
                <li><a href="#plov" className="hover:text-blue-600 transition-colors">Plov Radar</a></li>
                <li><a href="#guide" className="hover:text-blue-600 transition-colors">Cultural Guide</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Smart Search</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-6 dark:text-slate-50">Support</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm font-light">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Legal Guide</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
              © 2026 Uzbekistan Heritage & Smart Travel Ecosystem. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">Built for the Silk Road</span>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedLocations />
      <ExploreMap />
      <AITripPlanner />
      <PlovRadar />
      <CulturalGuide />
      <Testimonials />
    </main>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

