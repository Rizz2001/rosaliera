---
name: cart-whatsapp-checkout
description: Lógica del carrito de compras en su página propia (/carrito), estado global CartContext, persistencia en localStorage y proceso de checkout interactivo por pasos (Wizard por Pasos 1, 2 y 3). Usar al modificar el carrito o proceso de compra.
---

# Skill: Página de Carrito Propia (/carrito) - Wizard por Pasos Funcional

Esta skill define la arquitectura del **Carrito de Compras Interactivo por Pasos (Multi-step Wizard Flow)** en la página `/carrito`.

---

## 1. Regla de Flujo por Pasos Intermedios (Wizard 1, 2 y 3)

- 🟢 **CADA PASO ES EXCLUSIVO EN PANTALLA** (No apilar todos los formularios juntos).
- El estado local `currentStep` (1, 2 o 3) determina la vista activa:

### 🔹 Paso 1: Productos Seleccionados
- Muestra **únicamente la lista de productos** seleccionados, sus cantidades `[-] qty [+]`, subtotal por ítem y cupón de descuento.
- Acciones: *"Seguir Comprando"* y *"Continuar a Datos de Entrega ➔"*.

### 🔹 Paso 2: Datos de Entrega y Pago
- Muestra **únicamente el formulario de envío** (Nombre *, Teléfono, Dirección en Barinas, Notas) y las tarjetas de método de pago (Pago Móvil, Efectivo USD, Zelle, Transferencia).
- Acciones: *"← Volver a Productos"* y *"Continuar a Confirmación ➔"*.

### 🔹 Paso 3: Resumen Final y WhatsApp
- Muestra la **tarjeta de confirmación ejecutiva final** con la lista del pedido, el total con despacho y los datos del cliente.
- Acciones: *"← Editar Datos"* y *"Confirmar y Enviar Pedido por WhatsApp"*.
