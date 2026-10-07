import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { LoginPage } from './pages/LoginPage';

function ToastContainer() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-gray-900/95 backdrop-blur-md text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-gray-800 animate-fade-in flex items-center gap-2">
      <span className="text-green-400 text-base">✓</span>
      <span>{toastMessage}</span>
    </div>
  );
}

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <ScrollToTop />
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
              />
            }
          />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/categoria/:categorySlug" element={<CategoryPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      <ToastContainer />
      <MobileBottomNav />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CurrencyProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </CurrencyProvider>
      </AuthProvider>
    </HashRouter>
  );
}
