/**
 * Servicio de Inventario y Productos - Alimentos La Rosaliera
 * Capa de abstracción que actualmente lee de mockProducts.js
 * y se reemplazará por llamadas fetch/axios a la API del sistema.
 */

import { MOCK_PRODUCTS } from '../data/mockProducts';

export const productService = {
  /**
   * Obtiene todos los productos del inventario
   * @returns {Promise<Array>} Lista de productos
   */
  async getAllProducts() {
    // Simula retardo de red de 200ms para probar loaders
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_PRODUCTS;
  },

  /**
   * Obtiene un producto individual por su ID o Slug
   * @param {string} idOrSlug - ID o Slug del producto
   * @returns {Promise<Object|null>} Producto o null si no se encuentra
   */
  async getProductByIdOrSlug(idOrSlug) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const product = MOCK_PRODUCTS.find(
      p => p.id === idOrSlug || p.slug === idOrSlug
    );
    return product || null;
  },

  /**
   * Filtra productos por categoría
   * @param {string} categoryId - ID de la categoría (ej: carne-de-res)
   * @returns {Promise<Array>} Productos filtrados
   */
  async getProductsByCategory(categoryId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    if (!categoryId || categoryId === 'todos') {
      return MOCK_PRODUCTS;
    }
    return MOCK_PRODUCTS.filter(p => p.category === categoryId);
  },

  /**
   * Busca productos por palabra clave en el nombre o descripción
   * @param {string} query - Término de búsqueda
   * @returns {Promise<Array>} Productos coincidentes
   */
  async searchProducts(query) {
    await new Promise(resolve => setTimeout(resolve, 150));
    if (!query) return MOCK_PRODUCTS;
    const term = query.toLowerCase().trim();
    return MOCK_PRODUCTS.filter(
      p => p.name.toLowerCase().includes(term) ||
           p.description.toLowerCase().includes(term) ||
           p.categoryName.toLowerCase().includes(term)
    );
  }
};
