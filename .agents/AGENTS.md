# Reglas Generales de Desarrollo - Alimentos La Rosaliera

## 💎 REGLA MANDATORIA DE PERFECCIÓN INTEGRAL (Funcional, Gráfica y Responsiva)

Toda modificación realizada en el código de la tienda Alimentos La Rosaliera debe cumplir estrictamente con los siguientes tres pilares antes de considerarse terminada o lista para entrega:

1. ⚡ **Perfección Funcional**:
   - Cada botón, filtro, selector de cantidad, conversor de moneda dual ($ USD / Bs. BCV), flujo de carrito y checkout por pasos debe funcionar al 100% sin excepciones ni errores de consola.
   - Si se elimina una funcionalidad, se deben retirar limpiamente todas sus referencias, importaciones y estilos asociados para no dejar código muerto.

2. 🎨 **Perfección Gráfica y Estética**:
   - Respetar rigurosamente el sistema de tokens de marca (#58A618, #7CC12A, #E53935).
   - Tipografía ejecutiva, sombras suaves, bordes redondeados y glassmorphism en fondos de realce.
   - **Prohibido el uso de emojis**: Usar exclusivamente vectores SVG (`lucide-react`).

3. 📱 **Perfección Responsiva Móvil**:
   - Garantizar adaptación perfecta desde dispositivos móviles compactos (320px) hasta pantallas ultra-anchas.
   - Cero scroll horizontal indeseado (`overflow-x-hidden`).
   - Todos los botones interactivos deben tener zonas de toque amplias (mínimo 44px x 44px).
   - Espaciado inferior de seguridad (`pb-24` / `pb-28`) para evitar solapamientos con la barra de navegación inferior móvil (`MobileBottomNav`).

4. 🔒 **Confirmación Previa de Git**:
   - **Aclarar y solicitar confirmación expresa del usuario antes de ejecutar cualquier `git commit` o `git push`**.
