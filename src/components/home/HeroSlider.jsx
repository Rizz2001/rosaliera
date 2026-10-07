import React from 'react';
import { ArrowRight, Flame, Sparkles, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MOCK_PRODUCTS } from '../../data/mockProducts';

export function HeroSlider() {
  const { addToCart } = useCart();

  const mainProduct = MOCK_PRODUCTS[0]; // Solomo de Cuerito
  const secondary1 = MOCK_PRODUCTS[3];   // Queso Blanco
  const secondary2 = MOCK_PRODUCTS[5];   // Pechuga de Pollo

  return (
    <section className="py-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Hero Card */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-green-950 text-white p-6 md:p-10 flex flex-col justify-between shadow-xl border border-gray-800 group">
          <div 
            className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${mainProduct.images[0]})` }}
          />

          <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
            <span style={{ backgroundColor: '#E53935' }} className="inline-flex items-center gap-1.5 text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
              <Flame size={14} /> Oferta Especial del Día
            </span>
            <span className="bg-white/10 backdrop-blur-md text-green-300 text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
              100% Fresco de Barinas
            </span>
          </div>

          <div className="relative z-10 my-4 max-w-lg">
            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
              {mainProduct.name}
            </h2>
            <p className="text-xs md:text-sm text-gray-300 line-clamp-2 mb-6">
              {mainProduct.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Precio por {mainProduct.unit}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-green-400">${mainProduct.price.toFixed(2)}</span>
                  {mainProduct.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${mainProduct.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => addToCart(mainProduct, 1)}
                style={{ backgroundColor: '#58A618' }}
                className="hover:bg-green-600 text-white text-xs md:text-sm font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-green-600/30 transition-all flex items-center gap-2 group/btn"
              >
                <ShoppingCart size={18} />
                <span>Agregar al Carrito</span>
                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star size={13} className="fill-amber-400" />
              <Star size={13} className="fill-amber-400" />
              <Star size={13} className="fill-amber-400" />
              <Star size={13} className="fill-amber-400" />
              <Star size={13} className="fill-amber-400" />
              <span className="text-gray-300 ml-1">(4.9 de valoración)</span>
            </span>
            <span>Atención rápida en Alto Barinas</span>
          </div>
        </div>

        {/* Columnas Secundarias */}
        <div className="flex flex-col gap-6">
          
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-green-900 to-green-950 text-white p-6 flex flex-col justify-between shadow-lg border border-green-800/50 group">
            <div 
              className="absolute inset-0 opacity-30 mix-blend-overlay bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${secondary1.images[0]})` }}
            />
            <div className="relative z-10 flex justify-between items-start mb-2">
              <span className="bg-yellow-400 text-gray-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Más Vendido
              </span>
              <span className="text-lg font-bold text-yellow-300">${secondary1.price.toFixed(2)} / {secondary1.unit}</span>
            </div>
            <div className="relative z-10 my-2">
              <h3 className="text-lg font-bold text-white mb-1">{secondary1.name}</h3>
              <p className="text-xs text-gray-300 line-clamp-1">{secondary1.description}</p>
            </div>
            <button
              onClick={() => addToCart(secondary1, 1)}
              className="relative z-10 w-full mt-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2 rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-yellow-300" />
              <span>Agregar Rápido</span>
            </button>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-emerald-950 text-white p-6 flex flex-col justify-between shadow-lg border border-emerald-800/50 group">
            <div 
              className="absolute inset-0 opacity-30 mix-blend-overlay bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${secondary2.images[0]})` }}
            />
            <div className="relative z-10 flex justify-between items-start mb-2">
              <span className="bg-emerald-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Frescura 100%
              </span>
              <span className="text-lg font-bold text-emerald-300">${secondary2.price.toFixed(2)} / {secondary2.unit}</span>
            </div>
            <div className="relative z-10 my-2">
              <h3 className="text-lg font-bold text-white mb-1">{secondary2.name}</h3>
              <p className="text-xs text-gray-300 line-clamp-1">{secondary2.description}</p>
            </div>
            <button
              onClick={() => addToCart(secondary2, 1)}
              className="relative z-10 w-full mt-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2 rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={14} className="text-emerald-300" />
              <span>Agregar Rápido</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
