import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, ShoppingBag, Info, HelpCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function MobileBottomNav() {
  const { cartCount } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 flex items-center justify-around shadow-lg">
      {/* Botón Inicio */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-green-700 font-extrabold' : 'text-gray-500 hover:text-gray-900'
          }`
        }
      >
        <Home size={20} />
        <span>Inicio</span>
      </NavLink>

      {/* Botón Catálogo */}
      <a
        href="#catalogo"
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-gray-500 hover:text-green-700 transition-colors"
      >
        <Grid size={20} />
        <span>Catálogo</span>
      </a>

      {/* Botón Carrito Página Propia (/carrito) */}
      <NavLink
        to="/carrito"
        className={({ isActive }) =>
          `relative flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-green-700 font-extrabold' : 'text-gray-500 hover:text-gray-900'
          }`
        }
      >
        <div className="relative">
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span
              style={{ backgroundColor: '#E53935' }}
              className="absolute -top-1.5 -right-2 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white"
            >
              {cartCount}
            </span>
          )}
        </div>
        <span>Carrito</span>
      </NavLink>

      {/* Botón Nosotros */}
      <NavLink
        to="/nosotros"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-green-700 font-extrabold' : 'text-gray-500 hover:text-gray-900'
          }`
        }
      >
        <Info size={20} />
        <span>Nosotros</span>
      </NavLink>

      {/* Botón FAQ */}
      <NavLink
        to="/faq"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-green-700 font-extrabold' : 'text-gray-500 hover:text-gray-900'
          }`
        }
      >
        <HelpCircle size={20} />
        <span>Ayuda</span>
      </NavLink>
    </div>
  );
}
