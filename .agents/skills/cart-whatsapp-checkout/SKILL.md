---
name: cart-whatsapp-checkout
description: Lógica del carrito de compras en su página propia (/carrito), estado global CartContext, persistencia en localStorage y proceso de checkout integrado con WhatsApp. Usar al modificar el carrito o proceso de compra.
---

# Skill: Página de Carrito Propia (/carrito) y Checkout Integrado (Sin Modales Emergentes)

Esta skill especifica la arquitectura de la **Página Propia del Carrito de Compras (`/carrito`)** al estilo Farmatodo, garantizando que todo el proceso de revisión y checkout ocurra directamente en la página sin ventanas o mensajes emergentes (*no modals*).

---

## 1. Regla de Oro: Cero Modales Emergentes

- 🚫 **PROHIBIDO EL USO DE MODALES O VENTANAS EMERGENTES (POPUPS)** para el checkout o la captura de datos.
- 🟢 **TODO EL FORMULARIO DE CHECKOUT OCURRE DENTRO DE LA PÁGINA `/carrito`**:
  - Los campos de datos (Nombre, Teléfono, Dirección de Entrega en Barinas, Método de Pago y Notas) deben estar embebidos directamente en el cuerpo de la página de carrito.
  - El botón *"Enviar Pedido por WhatsApp"* debe estar integrado al final de la página.

---

## 2. Estructura de la Página `/carrito`

1. **Barra de Progreso por Pasos**:
   - `[1. Productos en Carrito]` -> `[2. Datos de Envío]` -> `[3. Confirmación WhatsApp]`
2. **Sección Izquierda / Principal**:
   - Lista detallada de productos con fotos, precios, control de cantidad integrados y subtotal.
   - **Formulario de Entrega integrado en la página**: Nombre, Teléfono, Dirección en Barinas, Método de Pago (Pago Móvil, Zelle, Efectivo, Transferencia) y Notas.
3. **Sección Derecha / Resumen de Orden (Order Summary)**:
   - Subtotal.
   - Despacho express en Alto Barinas.
   - Código de descuento.
   - Total final destacado.
   - Botón principal de compra: *"Enviar Pedido por WhatsApp"*.

---

## 3. Integración WhatsApp Directa

Al presionar en checkout, se envía la orden formateada directamente al chat de **Alimentos La Rosaliera** (`https://wa.link/u08fmw`).
