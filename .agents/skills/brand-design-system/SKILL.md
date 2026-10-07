---
name: brand-design-system
description: Guía de diseño visual, sistema de tokens, paleta de colores oficiales y estilos de marca para Alimentos La Rosaliera en React. Usar cuando se trabajen colores, componentes UI, tipografía, bordes y estilos estéticos.
---

# Skill: Sistema de Diseño y Marca (Alimentos La Rosaliera - Estilo Farmatodo)

Esta skill rige la identidad estética, los colores oficiales y las pautas visuales de **Alimentos La Rosaliera** inspiradas en las mejores prácticas de UX de **Farmatodo.com.ve**.

---

## 1. Regla Antivaciado: Prohibido Dejar Espacios en Blanco en Desktop

- 🚫 **NUNCA DEJAR ESPACIOS EN BLANCO EN SECCIONES HORIZONTALES (DESKTOP)**.
- En pantallas medianas y grandes (`md:` y `lg:`), secciones como la barra de categorías, carruseles de banners o tarjetas DEBEN distribuirse al 100% del ancho del contenedor (`w-full justify-between` o `grid`), aprovechando todo el ancho de pantalla sin vacíos asimétricos a la derecha.

---

## 2. Reglas Estrictas de Iconografía
- 🚫 **PROHIBIDO EL USO DE EMOJIS** en menús, categorías, botones o encabezados.
- 🟢 **UTILIZAR EXCLUSIVAMENTE ICONOS VECTORIALES REALES** (`lucide-react`):
  - Carne de Res: `<Beef />`
  - Quesos y Lácteos: `<Milk />` o `<Layers />`
  - Pollo: `<Drumstick />`
  - Huevos: `<Egg />`
  - Cerdos / Charcutería: `<UtensilsCrossed />`
  - Cosechas / Hortalizas: `<Apple />` o `<Leaf />`
  - Víveres / Punto Verde: `<ShoppingBag />`
  - Licores: `<Wine />`

---

## 3. Paleta de Colores Oficiales

```css
:root {
  /* Verde Principal de Marca (Verde Agro-Fresco) */
  --color-primary: #58A618;
  --color-primary-hover: #468612;
  
  /* Verde Acento y Detalles (Bordes y Badges) */
  --color-accent: #7CC12A;
  --color-accent-light: #EBF7DF;

  /* Superficie Suave de Fondo */
  --color-bg-light: #F4F9F1;
  --color-surface-white: #FFFFFF;

  /* Rojo Oferta / Destacados / Badges urgentes */
  --color-badge-red: #E53935;
  --color-badge-red-bg: #FFEBEE;

  /* Tipografía */
  --color-text-main: #1F2937;
  --color-text-muted: #6B7280;
  --color-text-light: #9CA3AF;
}
```

---

## 4. Patrones UX/UI de Referencia (Farmatodo.com.ve)

1. **Barra Superior con Ubicación**: Selector de ubicación para Barinas (*"¿Dónde quieres recibir tu pedido? Alto Barinas"*).
2. **Control de Cantidad Integrado en Tarjeta de Producto**:
   - Botón inicial: "Agregar".
   - Al agregar: Se transforma en selector dinámico `- [ Cantidad ] +` directo en la tarjeta.
3. **Badges de Despacho Express**: *"Entrega Express en 30-45 min"*.
4. **Logotipo Oficial**: Emblema verde dentado de Alimentos La Rosaliera.
