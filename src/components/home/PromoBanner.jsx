import React from 'react';
import { Flame, ArrowRight, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';

export function PromoBanner({ onSelectCategory }) {
  const { formatPrice, formatPriceDual } = useCurrency();
  const { addToCart } = useCart();

  // Objeto de Producto para el Combo Especial
  const parrilleroCombo = {
    id: 'combo-parrillero-rosaliera',
    name: 'Combo Parrillero Premium La Rosaliera',
    price: 24.99,
    category: 'carnes',
    categoryName: 'Parrillas',
    unit: 'Combo',
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'],
    description: '1kg Carne para Asar + 1kg Pollo Entero + 500g Chorizo Artesanal + 500g Queso Blanco Llanero.'
  };

  const handleAddCombo = () => {
    addToCart(parrilleroCombo, 1);
  };

  return (
    <section className="py-6 md:py-8 container mx-auto px-4 max-w-7xl">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-green-950 to-gray-900 border border-green-800/40 shadow-2xl p-6 sm:p-8 md:p-10 text-white">
        
        {/* Decoraciones de Fondo */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Columna Izquierda: Información del Combo */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
              <Flame size={14} className="animate-bounce" />
              <span>Combo Destacado del Mes</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white">
              Combo Parrillero <span className="text-green-400">Rosaliera Premium</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Disfruta del auténtico sabor llanero con cortes seleccionados de res, pollo fresco, chorizo artesanal y el mejor queso blanco de Barinas.
            </p>

            {/* Incluye */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="bg-white/10 border border-white/15 px-3 py-1 rounded-xl font-medium text-gray-200">
                🥩 1kg Carne para Asar
              </span>
              <span className="bg-white/10 border border-white/15 px-3 py-1 rounded-xl font-medium text-gray-200">
                🍗 1kg Pollo Entero
              </span>
              <span className="bg-white/10 border border-white/15 px-3 py-1 rounded-xl font-medium text-gray-200">
                🌭 500g Chorizo Artesanal
              </span>
              <span className="bg-white/10 border border-white/15 px-3 py-1 rounded-xl font-medium text-gray-200">
                🧀 500g Queso Llanero
              </span>
            </div>

            {/* Precios y Botones */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-baseline justify-center sm:justify-start gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {formatPrice(parrilleroCombo.price)}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">/ Combo completo</span>
                </div>
                <span className="text-xs font-bold text-green-400 block mt-0.5">
                  Tasa BCV Dual: {formatPriceDual(parrilleroCombo.price)}
                </span>
              </div>

              <button
                onClick={handleAddCombo}
                style={{ backgroundColor: '#58A618' }}
                className="hover:bg-green-600 text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2.5 min-h-[48px] w-full sm:w-auto hover:scale-105"
              >
                <ShoppingBag size={18} />
                <span>Agregar Combo al Carrito</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-green-400" /> 100% Calidad Garantizada
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles size={14} className="text-amber-400" /> Entrega Express 30 min
              </span>
            </div>

          </div>

          {/* Columna Derecha: Imagen Destacada del Combo */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl group">
              <img
                src={parrilleroCombo.images[0]}
                alt={parrilleroCombo.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-300 block">Promoción Especial</span>
                  <span className="text-xs font-bold text-white">Ideal para 4 - 6 Personas</span>
                </div>
                <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                  Ahorras 15%
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
