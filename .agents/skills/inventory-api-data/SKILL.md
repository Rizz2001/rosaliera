---
name: inventory-api-data
description: Arquitectura de servicios de datos, esqueleto de prueba de inventario (mockProducts.js) y preparación para futura integración con la API del sistema de La Rosaliera. Usar al trabajar con datos de productos o APIs.
---

# Skill: Gestión de Datos e Integración de API de Inventario

Esta skill define la capa de desacoplamiento de datos para consumir el inventario de **Alimentos La Rosaliera**, permitiendo trabajar hoy con un esqueleto estático y migrar a la API del sistema sin alterar la interfaz gráfica.

---

## 1. Capa de Servicios (`services/productService.js`)

Todos los componentes de React consumen los productos EXCLUSIVAMENTE a través de esta capa:

```javascript
import { MOCK_PRODUCTS } from '../data/mockProducts';

// Por los momentos se sirve del esqueleto Mock.
// Mañana se reemplazará por `fetch('/api/v1/inventory')` o Axios.
export const productService = {
  async getAllProducts() {
    return MOCK_PRODUCTS;
  },

  async getProductById(id) {
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  },

  async getProductsByCategory(categorySlug) {
    return MOCK_PRODUCTS.filter(p => p.category === categorySlug);
  }
};
```

---

## 2. Hook Personalizado (`hooks/useProducts.js`)

```javascript
import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export function useProducts(category = null) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchFunc = category 
      ? productService.getProductsByCategory(category)
      : productService.getAllProducts();

    fetchFunc.then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, [category]);

  return { products, loading };
}
```

---

## 3. Formato del Objeto de Producto

```json
{
  "id": "prod-001",
  "slug": "solomo-de-cuerito-kg",
  "name": "Solomo de Cuerito de Res",
  "category": "carne-de-res",
  "categoryName": "Carne de Res",
  "price": 9.50,
  "unit": "kg",
  "stock": 45,
  "inStock": true,
  "isOffer": true,
  "isFresh": true,
  "rating": 4.9,
  "description": "Carne de res de primera calidad, corte tierno e ideal para asar.",
  "images": ["/images/products/solomo.jpg"]
}
```
