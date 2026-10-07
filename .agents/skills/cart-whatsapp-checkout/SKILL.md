---
name: cart-whatsapp-checkout
description: Lógica del carrito de compras en su página propia (/carrito), estado global CartContext, persistencia en localStorage y proceso de checkout integrado con WhatsApp. Usar al modificar el carrito o proceso de compra.
---

# Skill: Página de Carrito Propia (/carrito) y Checkout por WhatsApp

Esta skill especifica la arquitectura de la **Página Propia del Carrito de Compras (`/carrito`)** al estilo Farmatodo, sustituyendo los paneles flotantes por una experiencia dedicada e inmersiva.

---

## 1. Estructura de la Página del Carrito (`/carrito`)

1. **Barra de Progreso por Pasos**:
   - `[1. Mi Carrito]` -> `[2. Datos de Entrega]` -> `[3. Confirmación WhatsApp]`
2. **Tabla Detallada de Productos**:
   - Miniatura de producto, nombre, categoría, precio por unidad, selector interactivo `[-] cantidad [+]`, subtotal por fila y botón eliminar.
3. **Resumen Lateral de la Orden (Order Summary)**:
   - Subtotal.
   - Cálculo de tarifa de envío (*Gratis superando $25*).
   - Campo para código promocional / descuento.
   - Total final destacado.
   - Botón principal: *"Proceder al Checkout por WhatsApp"*.
   - Enlace secundario: *"Seguir Comprando"*.

---

## 2. Integración WhatsApp Directa

Al presionar en checkout, se envía el pedido formateado al chat de **Alimentos La Rosaliera** (`https://wa.link/u08fmw`).
