import React from 'react';
import { ProductCard } from './ProductCard';
import { ShoppingBag, Beef } from 'lucide-react';

export function ProductGrid({ products, loading, error, selectedCategory, onSelectCategory }) {
  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-xs text-gray-500 font-medium">Cargando inventario de productos frescos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-500 text-sm font-semibold">
        {error}
      </div>
    );
  }

  return (
    <section id="catalogo" className="py-8">
      <div className="container mx-auto px-4">
        {/* Cabecera del Catálogo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-2.5">
              <Beef className="text-green-600" size={24} />
              <span>Catálogo de Productos Frescos</span>
            </h2>
            <p className="text-xs text-gray-500">
              {products.length} rubros listos para despacho en Alto Barinas
            </p>
          </div>
        </div>

        {/* Sin resultados */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto my-8">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">No se encontraron productos</h3>
            <p className="text-xs text-gray-500 mb-4">Prueba seleccionando otra categoría o cambiando la búsqueda.</p>
            <button
              onClick={() => onSelectCategory('todos')}
              className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
            >
              Ver Todo el Catálogo
            </button>
          </div>
        ) : (
          /* Rejilla de Productos Responsiva */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
