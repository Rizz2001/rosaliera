---
name: responsive-mobile-first
description: Reglas y estándares para garantizar que la tienda de Alimentos La Rosaliera sea 100% responsiva y optimizada para teléfonos móviles y pantallas anchas sin espacios en blanco. Usar al trabajar en layouts, menús táctiles y diseño adaptable.
---

# Skill: Adaptabilidad Responsiva y Distribución Completa

Esta skill establece las pautas para que la tienda de **Alimentos La Rosaliera** sea rápida, táctil y equilibrada en cualquier dispositivo, distribuyendo el contenido al 100% sin dejar huecos en blanco a los lados en pantallas grandes.

---

## 1. Regla de Distribución Completa (No Blank Spaces)

- En pantallas medianas y grandes (`md:` y `lg:`), elementos horizontales como carruseles de categorías o barras de navegación DEBEN distribuirse usando `justify-between`, `grid` o `flex-1` para abarcar todo el ancho del contenedor sin dejar espacios muertos a la derecha.

---

## 2. Puntos de Interrupción (Breakpoints)

- **Mobile Extra-Pequeño (`xs`)**: `320px - 480px` (Smartphones en vertical)
- **Mobile Grande / Tablet (`sm`)**: `481px - 768px`
- **Tablet / Laptop (`md`)**: `769px - 1024px`
- **Desktop (`lg/xl`)**: `> 1024px`

---

## 3. Componentes Adaptables

- **Navegación Inferior Móvil (`MobileBottomNav`)**: Barra fija inferior en smartphones.
- **Categorías Adaptables**: Scroll horizontal en smartphones, distribución uniforme a lo ancho en escritorio.
