import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, PhoneCall, MapPin, Instagram, Beef, Layers, Drumstick, Egg, Utensils, Apple, Wine, ChevronDown, User, LogOut, LogIn } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useCompany } from '../../context/CompanyContext';
import { Logo } from '../common/Logo';
import { CurrencyToggle } from '../common/CurrencyToggle';
import { PRODUCT_CATEGORIES } from '../../config/constants';

const ICON_MAP = {
  Beef: Beef,
  Layers: Layers,
  Drumstick: Drumstick,
  Egg: Egg,
  Utensils: Utensils,
  Apple: Apple,
  ShoppingBag: ShoppingBag,
  Wine: Wine
};

export function Navbar({ searchQuery, setSearchQuery }) {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { companyInfo } = useCompany();
  const navigate = useNavigate();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-2xs border-b border-gray-100">
      
      {/* Top Bar Informativa con Selector Dual de Moneda ($ USD / Bs. BCV) */}
      <div style={{ backgroundColor: '#58A618' }} className="text-white text-[11px] py-1.5 px-3 md:px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Ubicación y Despacho Express */}
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <button className="flex items-center gap-1 font-bold hover:text-green-100 transition-colors truncate">
              <MapPin size={13} className="shrink-0" />
              <span className="truncate">Alto Barinas, Barinas</span>
              <ChevronDown size={11} className="shrink-0" />
            </button>
            <span className="hidden sm:inline text-green-100">| Express {companyInfo.deliveryTime || '30-45 min'}</span>
          </div>

          {/* Selector de Moneda Dual + Contacto */}
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] shrink-0">
            <CurrencyToggle />

            {companyInfo.whatsappLink && (
              <a 
                href={companyInfo.whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1 font-semibold hidden sm:flex"
              >
                <PhoneCall size={11} /> WhatsApp
              </a>
            )}
            {companyInfo.instagram && (
              <a 
                href={`https://instagram.com/${companyInfo.instagram.replace('@', '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-200 hidden sm:block font-medium"
                aria-label="Instagram La Rosaliera"
              >
                <Instagram size={13} />
              </a>
            )}
          </div>
        </div>
      </div>


      {/* Main Header Navbar */}
      <div className="container mx-auto py-2.5 px-3 md:px-4 flex items-center justify-between gap-3">
        
        {/* Logo Oficial de Alimentos La Rosaliera */}
        <Link to="/" className="hover:opacity-95 transition-opacity shrink-0">
          <Logo className="w-9 h-9 sm:w-11 sm:h-11" showText={true} />
        </Link>

        {/* Buscador Central Desktop */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl hidden md:block relative">
          <input
            type="text"
            placeholder="¿Qué buscas hoy? Carne, queso, pollo, huevos, hortalizas..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white text-xs md:text-sm text-gray-800 placeholder-gray-400 py-2.5 pl-10 pr-4 rounded-full border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
          />
          <Search className="absolute left-3.5 top-3 text-gray-400" size={17} />
        </form>

        {/* Acciones del Encabezado */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Botón Buscar en Móvil */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
            aria-label="Buscar productos"
          >
            <Search size={18} />
          </button>

          {/* Estado de Usuario (Sesión) */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs font-semibold">
              <User size={15} className="text-green-700" />
              <span className="hidden sm:inline text-gray-800 font-bold truncate max-w-[110px]">
                {user?.name || 'Mi Cuenta'}
              </span>
              <button
                onClick={logout}
                title="Cerrar Sesión"
                className="text-gray-400 hover:text-red-600 transition-colors ml-1"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-3 py-2 rounded-full border border-gray-200 transition-all shrink-0"
            >
              <LogIn size={15} className="text-green-700" />
              <span className="hidden sm:inline">Ingresar</span>
            </Link>
          )}

          {/* Botón Carrito (/carrito) */}
          <Link
            to="/carrito"
            className="relative flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition-all shadow-md shrink-0"
            aria-label="Ver Carrito de Compras"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Carrito</span>
            {cartCount > 0 && (
              <span className="bg-white text-green-700 text-[10px] font-black px-1.5 py-0.2 rounded-full border border-green-700">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Buscador Desplegable para Móviles */}
      {showMobileSearch && (
        <div className="md:hidden p-3 bg-gray-50 border-t border-gray-100 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Buscar carnes, quesos, víveres..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="w-full bg-white text-xs text-gray-800 placeholder-gray-400 py-2.5 pl-9 pr-3 rounded-full border border-green-500 focus:ring-2 focus:ring-green-100"
            />
            <Search className="absolute left-3 top-3 text-green-600" size={15} />
          </form>
        </div>
      )}

      {/* Barra de Categorías Rápidas Desktop */}
      <nav className="hidden md:block bg-gray-50 border-t border-gray-100 py-2">
        <div className="container mx-auto flex items-center justify-between overflow-x-auto text-xs font-semibold text-gray-700 gap-4 px-4 scrollbar-none">
          <Link to="/" className="text-green-700 font-extrabold hover:underline whitespace-nowrap flex items-center gap-1.5">
            <ShoppingBag size={15} />
            <span>Todos los Productos</span>
          </Link>

          {PRODUCT_CATEGORIES.map(cat => {
            const IconComponent = ICON_MAP[cat.iconName] || ShoppingBag;
            return (
              <Link
                key={cat.id}
                to={`/categoria/${cat.id}`}
                className="hover:text-green-600 transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <IconComponent size={15} className="text-green-600" />
                <span>{cat.name}</span>
              </Link>
            );
          })}

          <div className="flex items-center gap-4 border-l border-gray-200 pl-4 ml-auto shrink-0">
            <Link to="/nosotros" className="hover:text-green-600 transition-colors whitespace-nowrap font-bold text-gray-700">
              Nosotros
            </Link>
            <Link to="/faq" className="hover:text-green-600 transition-colors whitespace-nowrap font-bold text-gray-700">
              Preguntas Frecuentes
            </Link>
          </div>
        </div>
      </nav>

    </header>
  );
}
