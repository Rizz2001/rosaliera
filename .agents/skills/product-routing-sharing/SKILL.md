---
name: product-routing-sharing
description: Estándares para el enrutamiento individual por producto, rutas compartibles (/producto/:id) y funcionalidad de compartir por WhatsApp/Redes. Usar al crear páginas de producto o enlaces compartibles.
---

# Skill: Enrutamiento Individual y Enlaces Compartibles

Esta skill garantiza que cada producto de **Alimentos La Rosaliera** tenga una dirección URL única y compartible, permitiendo enviarla por WhatsApp o redes sociales.

---

## 1. Estructura de Rutas en React Router

```jsx
// Enrutamiento en App.jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/producto/:id" element={<ProductDetailPage />} />
  <Route path="/categoria/:slug" element={<CategoryPage />} />
</Routes>
```

---

## 2. Componente de Compartir (`ShareButton.jsx`)

Cada vista de producto debe incluir un botón de "Compartir" que utilice la API nativa del navegador o copia al portapapeles:

```javascript
const handleShare = async (product) => {
  const shareData = {
    title: `${product.name} | Alimentos La Rosaliera`,
    text: `¡Mira este producto fresco de La Rosaliera: ${product.name} a solo $${product.price}/${product.unit}!`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('Compartir cancelado');
    }
  } else {
    // Fallback: Copiar al portapapeles
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado al portapapeles!');
  }
};
```

---

## 3. Ficha de Producto Individual (`ProductDetailPage.jsx`)

La página individual del producto debe incluir:
- Galería de imágenes en alta resolución.
- Badge de disponibilidad en tiempo real.
- Selector de cantidad con precio calculado al instante.
- Botones de "Añadir al Carrito" y "Comprar por WhatsApp".
- Botón flotante para compartir por redes.
