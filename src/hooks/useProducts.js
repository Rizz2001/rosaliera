/**
 * Custom Hook: useProducts
 * Permite a cualquier componente consultar productos con soporte de carga y filtrado.
 */

import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export function useProducts(categoryFilter = 'todos', searchQuery = '') {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadData = async () => {
      try {
        let result = [];
        if (searchQuery.trim() !== '') {
          result = await productService.searchProducts(searchQuery);
        } else if (categoryFilter !== 'todos') {
          result = await productService.getProductsByCategory(categoryFilter);
        } else {
          result = await productService.getAllProducts();
        }

        if (isMounted) {
          setProducts(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Error al cargar inventario de productos');
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [categoryFilter, searchQuery]);

  return { products, loading, error };
}
