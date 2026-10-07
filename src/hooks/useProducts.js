import { useMemo } from 'react';
import { useProductsContext } from '../context/ProductContext';

export function useProducts(categoryFilter = 'todos', searchQuery = '') {
  const { products: allProducts } = useProductsContext();

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (searchQuery && searchQuery.trim() !== '') {
      const term = searchQuery.toLowerCase().trim();
      result = result.filter(
        p => p.name.toLowerCase().includes(term) ||
             p.description.toLowerCase().includes(term) ||
             (p.categoryName && p.categoryName.toLowerCase().includes(term))
      );
    } else if (categoryFilter && categoryFilter !== 'todos') {
      result = result.filter(p => p.category === categoryFilter);
    }

    return result;
  }, [allProducts, categoryFilter, searchQuery]);

  return { products: filteredProducts, loading: false, error: null };
}
