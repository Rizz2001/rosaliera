import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/mockProducts';

const ProductContext = createContext();
const LOCAL_STORAGE_PRODUCTS_KEY = 'rosaliera_products';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
    } catch (e) {
      console.error("Error al cargar productos de localStorage", e);
      return MOCK_PRODUCTS;
    }
  });

  // Guardar en localStorage al cambiar productos
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error("Error al guardar productos", e);
    }
  }, [products]);

  // Actualizar un producto existente (precio, stock, nombre, etc.)
  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  // Agregar un nuevo producto al catálogo
  const addProduct = (newProductData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      slug: newProductData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      isOffer: false,
      images: [newProductData.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'],
      ...newProductData
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  // Eliminar un producto
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Restablecer catálogo original de fábrica
  const resetProductsToDefault = () => {
    setProducts(MOCK_PRODUCTS);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        updateProduct,
        addProduct,
        deleteProduct,
        resetProductsToDefault
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductsContext debe ser usado dentro de ProductProvider');
  }
  return context;
}
