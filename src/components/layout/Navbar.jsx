import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, PhoneCall, MapPin, Instagram, Beef, Layers, Drumstick, Egg, Utensils, Apple, Wine, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Logo } from '../common/Logo';
import { COMPANY_INFO, PRODUCT_CATEGORIES } from '../../config/constants';

// Mapa de Iconos Lucide Vectoriales por Nombre (Sin Emojis)
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
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-gray-100">
      
      {/* Top Bar Informativa Estilo Farmatodo (Ubicación y Despacho) */}
      <div style={{ backgroundColor: '#58A618' }} className="text-white text-xs py-1.5 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Ubicación y Despacho Express */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 font-bold hover:text-green-100 transition-colors">
              <MapPin size={14} className="text-white" />
              <span>¿Dónde entregar?: <span className="underline">Alto Barinas, Barinas</span></span>
              <ChevronDown size={12} />
            </button>
            <span className="hidden md:inline text-green-100">| Entrega Express en {COMPANY_INFO.deliveryTime}</span>
          </div>

          {/* Contacto y Redes */}
          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href={COMPANY_INFO.whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1 font-semibold"
            >
              <PhoneCall size={12} /> WhatsApp: {COMPANY_INFO.whatsappNumber}
            </a>
            <a 
              href="https://instagram.com/alimentoslarosaliera" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-200"
            >
              <Instagram size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Navbar */}
      <div className="container mx-auto py-3 px-4 flex items-center justify-between gap-4">
        
        {/* Logo Oficial de Alimentos La Rosaliera */}
        <Link to="/" className="hover:opacity-95 transition-opacity">
          <Logo className="w-11 h-11" showText={true} />
        </Link>

        {/* Buscador Prominente (Estilo Farmatodo) */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl hidden md:block relative">
          <input
            type="text"
            placeholder="¿Qué buscas hoy? Carne, queso, pollo, huevos, hortalizas..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white text-xs md:text-sm text-gray-800 placeholder-gray-400 py-2.5 pl-10 pr-4 rounded-full border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all shadow-2xs"
          />
          <Search className="absolute left-3.5 top-3 text-gray-400" size={17} />
        </form>

        {/* Acciones del Encabezado */}
        <div className="flex items-center gap-3">
          {/* Botón WhatsApp */}
          <a
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 font-bold text-xs px-3.5 py-2 rounded-full border border-green-200 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            WhatsApp Directo
          </a>

          {/* Botón Navegar a Página Propia de Carrito (/carrito) */}
          <Link
            to="/carrito"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition-all shadow-md"
            aria-label="Ver Carrito de Compras"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Mi Carrito</span>
            {cartCount > 0 && (
              <span className="bg-white text-green-700 text-[11px] font-black px-1.5 py-0.5 rounded-full border border-green-700">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Barra de Categorías Rápidas (Iconos Vectoriales Reales - Sin Emojis) */}
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
        </div>
      </nav>

    </header>
  );
}
