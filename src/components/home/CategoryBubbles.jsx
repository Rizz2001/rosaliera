import React from 'react';
import { Beef, Layers, Drumstick, Egg, Utensils, Apple, ShoppingBag, Wine, Sparkles } from 'lucide-react';
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

export function CategoryBubbles({ selectedCategory, onSelectCategory }) {
  return (
    <section className="py-6 bg-gradient-to-r from-green-50/70 via-emerald-50/50 to-green-50/70 border-y border-green-100/60">
      <div className="container mx-auto px-4">
        
        {/* Cabecera de Sección */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base md:text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <Sparkles className="text-green-600" size={20} />
              <span>Explora por Categoría</span>
            </h3>
            <p className="text-xs text-gray-500">Selecciona para filtrar el catálogo fresco de La Rosaliera</p>
          </div>
          {selectedCategory !== 'todos' && (
            <button
              onClick={() => onSelectCategory('todos')}
              className="text-xs text-green-700 font-bold hover:underline"
            >
              Ver Todas
            </button>
          )}
        </div>

        {/* Contenedor de Burbujas: En Móvil es scroll horizontal, en Desktop se distribuye al 100% (100% width, justify-between sin espacios vacíos) */}
        <div className="w-full flex md:justify-between items-center gap-4 overflow-x-auto md:overflow-visible pb-3 pt-1 md:pb-0 scrollbar-none snap-x">
          
          {/* Bubble Ver Todos */}
          <button
            onClick={() => onSelectCategory('todos')}
            className={`flex-shrink-0 md:flex-1 flex flex-col items-center gap-2 transition-all duration-300 group snap-start ${
              selectedCategory === 'todos' ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            <div
              className={`w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-md transition-all border-2 ${
                selectedCategory === 'todos'
                  ? 'bg-green-600 text-white border-green-700 ring-4 ring-green-100'
                  : 'bg-white text-gray-700 border-gray-200 group-hover:border-green-500'
              }`}
            >
              <Sparkles size={24} />
            </div>
            <span
              className={`text-xs font-semibold text-center max-w-[85px] line-clamp-1 ${
                selectedCategory === 'todos' ? 'text-green-700 font-bold' : 'text-gray-600'
              }`}
            >
              Ver Todos
            </span>
          </button>

          {/* Bubbles por Categoría */}
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const IconComponent = ICON_MAP[cat.iconName] || ShoppingBag;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 md:flex-1 flex flex-col items-center gap-2 transition-all duration-300 group snap-start ${
                  isSelected ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-sm transition-all border-2 ${
                    isSelected
                      ? 'bg-green-600 text-white border-green-700 ring-4 ring-green-100 shadow-md'
                      : 'bg-white text-green-700 border-gray-200 group-hover:border-green-500 group-hover:shadow-md'
                  }`}
                >
                  <IconComponent size={24} />
                </div>
                <span
                  className={`text-xs font-semibold text-center max-w-[90px] leading-tight line-clamp-2 ${
                    isSelected ? 'text-green-700 font-bold' : 'text-gray-700 group-hover:text-green-700'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
