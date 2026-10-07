---
name: responsive-mobile-first
description: Reglas y estándares para garantizar que la tienda de Alimentos La Rosaliera sea 100% responsiva y optimizada para teléfonos móviles y pantallas anchas sin espacios en blanco. Usar al trabajar en layouts, menús táctiles y diseño adaptable.
---

# Skill: Adaptabilidad Responsiva y Perfección Funcional/Gráfica Pre-Entrega

Esta skill establece las pautas de usabilidad táctil y la **regla obligatoria de perfección funcional, gráfica y responsiva** para garantizar que cualquier cambio en la tienda sea 100% impecable en cualquier dispositivo.

---

## 💎 REGLA OBLIGATORIA DE PERFECCIÓN INTEGRAL (Funcional, Gráfica y Responsiva)

- **CADA FUNCIONALIDAD O COMPONENTE QUE SE AGREGUE O SE QUITE DE LA PÁGINA DEBE QUEDAR PERFECCIONADO AL 100%**:
  1. ⚡ **Perfección Funcional**: Toda interacción, botón, cálculo de precios duales ($/Bs), filtro, carrito y flujo de checkout debe ejecutar de forma exacta sin errores ni estados inconsistentes.
  2. 🎨 **Perfección Gráfica y Estética**: Los componentes deben mantener la armonía del sistema de diseño de Alimentos La Rosaliera (paleta `#58A618`, `#7CC12A`, `#E53935`, tipografía moderna, bordes redondeados, sombras suaves, cero emojis, vector SVG exclusivo).
  3. 📱 **Perfección Responsiva Móvil**: Verificar que en smartphones (de 320px en adelante) y pantallas anchas no existan desbordamientos horizontales, textos cortados ni elementos solapados con la `MobileBottomNav`.

---

## 🛡️ Lista de Chequeo Pre-Entrega (Mobile & Layout Verification)

- **ANTES DE ENTREGAR EL PROYECTO O CUALQUIER MEJORA, SE DEBE VERIFICAR MINUCIOSAMENTE**:
  1. 📱 **Cero Desbordamientos Horizontales**: Ningún elemento debe provocar scroll horizontal indeseado (`overflow-x-hidden`).
  2. 👆 **Usabilidad Táctil (Touch Targets)**: Todos los botones, iconos interactivos y controles de cantidad deben tener un tamaño cómodo para el pulgar (mínimo `44px x 44px` o padding holgado).
  3. 🧭 **Barra Inferior Flotante Libre de Solapamientos**: La `MobileBottomNav` debe estar visible y fija en el borde inferior sin tapar información clave de los formularios o pies de página (aplicar `pb-24` o `pb-28` en contenedores de páginas).
  4. 🔤 **Jerarquía Tipográfica Táctil**: Ajustar tamaños de fuente en móviles (`text-xs`, `text-sm`, `text-xl`) para evitar saltos de línea feos o textos encimados.
  5. 🔍 **Verificación de Adición/Eliminación de Componentes**: Confirmar que no queden importaciones muertas, referencias rotas ni elementos flotantes fuera de lugar al agregar o eliminar secciones.

---

## 1. Puntos de Interrupción (Breakpoints)

- **Mobile Extra-Pequeño (`xs`)**: `320px - 480px` (Smartphones en vertical)
- **Mobile Grande / Tablet (`sm`)**: `481px - 768px`
- **Tablet / Laptop (`md`)**: `769px - 1024px`
- **Desktop (`lg/xl`)**: `> 1024px`

---

## 2. Componentes Adaptables Estandarizados

- **Navegación Inferior Móvil (`MobileBottomNav`)**: Barra fija inferior en smartphones con 4 accesos principales (*Inicio*, *Catálogo*, *Carrito*, *WhatsApp*).
- **Categorías Adaptables (`CategoryBubbles`)**: Desplazamiento táctil `overflow-x-auto snap-x` en móviles y distribución del 100% en escritorios.
- **Grilla de Productos**: 2 columnas compactas o 1 columna amplia en smartphones (`grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`).
