/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedLocations from './components/FeaturedLocations';
import ExploreMap from './components/ExploreMap';
import AITripPlanner from './components/AITripPlanner';
import PlovRadar from './components/PlovRadar';
import CulturalGuide from './components/CulturalGuide';
import ErrorBoundary from './components/ErrorBoundary';
import ImamAlBukhariPage from './components/ImamAlBukhariPage';
import AdminDashboard from './components/AdminDashboard';
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
    <div className="min-h-screen bg-cotton dark:bg-black selection:bg-samarkand/20 selection:text-samarkand transition-colors duration-300">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 silk-gradient z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations/imam-al-bukhari" element={<ImamAlBukhariPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>

      <footer className="py-20 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 uzbek-pattern opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 silk-gradient rounded-xl flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-2xl">U</span>
                </div>
                <span className="font-serif font-bold text-2xl tracking-tight">
                  Uzbekistan <span className="text-silk">Heritage</span>
                </span>
              </div>
              <p className="text-white/50 max-w-md font-light leading-relaxed">
                A premium travel ecosystem dedicated to preserving and showcasing the rich cultural heritage of Uzbekistan through modern technology and smart services.
              </p>
            </div>
            
            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-white/50 text-sm font-light">
                <li><a href="#explore" className="hover:text-silk transition-colors">Explore Map</a></li>
                <li><a href="#plov" className="hover:text-silk transition-colors">Plov Radar</a></li>
                <li><a href="#guide" className="hover:text-silk transition-colors">Cultural Guide</a></li>
                <li><a href="#" className="hover:text-silk transition-colors">Smart Search</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-4 text-white/50 text-sm font-light">
                <li><a href="#" className="hover:text-silk transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-silk transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-silk transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-silk transition-colors">Legal Guide</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
              © 2026 Uzbekistan Heritage & Smart Travel Ecosystem. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Built for the Silk Road</span>
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

