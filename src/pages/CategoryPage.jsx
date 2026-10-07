import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { PRODUCT_CATEGORIES } from '../config/constants';

export function CategoryPage() {
  const { categorySlug } = useParams();
  const { products, loading, error } = useProducts(categorySlug);

  const currentCategory = PRODUCT_CATEGORIES.find(c => c.id === categorySlug);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-green-700 mb-6 bg-white px-3.5 py-2 rounded-full border border-gray-200 shadow-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Volver al Catálogo Principal</span>
        </Link>

        {/* Header de la Categoría */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md mb-8 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center text-3xl shrink-0">
            {currentCategory ? currentCategory.icon : '🛒'}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
              {currentCategory ? currentCategory.name : 'Categoría de Productos'}
            </h1>
            <p className="text-xs text-gray-500">
              Productos seleccionados y listos para envío en Alto Barinas
            </p>
          </div>
        </div>

        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          selectedCategory={categorySlug}
          onSelectCategory={() => {}}
        />
      </div>
    </main>
  );
}
