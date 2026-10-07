---
name: architecture-folder-structure
description: Guía de organización de archivos, estructura de carpetas modular y convenciones de código para mantener la página en constante crecimiento. Usar al crear nuevos componentes o carpetas.
---

# Skill: Arquitectura de Carpetas, Limpieza de Código y Prevención de Regresiones

Esta skill define la organización técnica del repositorio y los **estándares estrictos de mantenimiento** para garantizar que el proyecto **Alimentos La Rosaliera** crezca sin acumular código basura ni perder funcionalidades existentes.

---

## 1. Principios Obligatorios de Mantenibilidad y Calidad

### 🛡️ 1. Prevención de Regresiones (No romper funcionalidades)
- **Verificación de Impacto**: Antes de modificar un componente, hook o servicio, revisar **dónde y cómo se está utilizando** en el resto de la aplicación.
- **Preservación de Contratos**: No eliminar props, métodos del `CartContext` ni parámetros de funciones que otros componentes estén consumiendo.
- **Validación de Funcionalidad**: Verificar siempre que las funcionalidades clave (carrito `/carrito`, rutas individuales `/producto/:id`, envío a WhatsApp, filtros por categoría y responsividad) sigan funcionando correctamente tras cualquier cambio.

### 🧹 2. Cero Código Basura (Dead Code Elimination)
- **Sin Imports Huérfanos**: Eliminar inmediatamente cualquier `import` que ya no se utilice.
- **Sin Funciones ni Componentes Muertos**: Si una función, variable o componente ya no se necesita tras una refactorización, **eliminarlo por completo** en lugar de comentarlo o dejarlo abandonado.
- **Sin Comentarios Temporales**: No dejar comentarios de código desactivado (`// code...`) en el código de producción.
- **Compilación Limpia**: Ejecutar la verificación de compilación (`npm run build`) tras realizar modificaciones para comprobar que el código es 100% limpio y libre de errores.

---

## 2. Estructura de Carpetas del Proyecto

```text
src/
├── assets/                 # Recursos gráficos, marca de la empresa y logo oficial
│   ├── icons/              # Componentes de iconos vectoriales (Lucide React)
│   ├── images/             # Logotipo oficial de La Rosaliera y banners
│   └── styles/             # Variables CSS globales y Tailwind CSS v4
├── components/             # Componentes modulares
│   ├── common/             # UI Kit (Logo.jsx, Button, Badge, Modal, ShareButton)
│   ├── layout/             # Componentes estructurales (Header, Navbar, Footer, MobileNav)
│   ├── home/               # Secciones de Inicio (HeroSlider, CategoryBubbles, TrustBadges)
│   ├── product/            # Tarjetas con control de cantidad integrados y grillas
│   ├── cart/               # Componentes de la página de carrito (/carrito)
│   └── checkout/           # Modales de checkout y confirmación
├── config/                 # Constantes (Empresa, teléfono, RIF, categorías con iconos)
├── context/                # Estado global (CartContext)
├── data/                   # Datos de prueba (mockProducts.js)
├── hooks/                  # Custom Hooks reutilizables (useProducts, useCart)
├── pages/                  # Páginas principales:
│   ├── HomePage.jsx        # Landing + Catálogo
│   ├── ProductDetailPage.jsx # Ficha individual (/producto/:id)
│   ├── CartPage.jsx        # Página Propia de Carrito de Compras (/carrito)
│   └── CategoryPage.jsx    # Vista por categoría (/categoria/:slug)
├── services/               # Comunicación con API externa (productService.js)
└── utils/                  # Funciones de ayuda (formatCurrency, formatWhatsAppMessage)
```

---

## 3. Convenciones de Nomenclatura

- **Iconos**: Utilizar EXCLUSIVAMENTE iconos vectoriales SVG (`lucide-react`). Prohibidos los emojis.
- **Páginas**: `HomePage.jsx`, `ProductDetailPage.jsx`, `CartPage.jsx`, `CategoryPage.jsx`.
