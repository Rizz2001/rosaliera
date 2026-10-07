import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { CategoryBubbles } from '../components/home/CategoryBubbles';
import { TrustBadges } from '../components/home/TrustBadges';
import { ProductGrid } from '../components/product/ProductGrid';
import { useProducts } from '../hooks/useProducts';

export function HomePage({ selectedCategory, onSelectCategory, searchQuery }) {
  const { products, loading, error } = useProducts(selectedCategory, searchQuery);

  return (
    <main className="min-h-screen">
      {/* Hero Slider de Promociones */}
      <HeroSlider />

      {/* Burbujas Circulares de Categoría */}
      <CategoryBubbles
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* Franja de Confianza e Insignias */}
      <TrustBadges />

      {/* Catálogo de Productos Filtable */}
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
    </main>
  );
}
