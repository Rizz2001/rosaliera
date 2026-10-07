---
name: architecture-folder-structure
description: Guía de organización de archivos, estructura de carpetas modular y convenciones de código para mantener la página en constante crecimiento. Usar al crear nuevos componentes o carpetas.
---

# Skill: Arquitectura de Carpetas y Crecimiento Escalable (Estilo Farmatodo)

Esta skill define la organización técnica del repositorio para que cualquier desarrollador o agente de IA pueda mantener y hacer crecer la tienda web de **Alimentos La Rosaliera** de forma limpia y modular.

---

## 1. Estructura de Carpetas del Proyecto

```text
src/
├── assets/                 # Recursos gráficos, marca de la empresa y logo oficial
│   ├── icons/              # Componentes de iconos vectoriales (Lucide React)
│   ├── images/             # Logotipo oficial de La Rosaliera y banners
│   └── styles/             # Variables CSS globales y Tailwind CSS v4
├── components/             # Componentes modulares
│   ├── common/             # UI Kit (Logo.jsx, Button, Badge, Modal, ShareButton)
│   ├── layout/             # Componentes estructurales (Header, Navbar, Footer, MobileNav, LocationBar)
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

## 2. Convenciones de Nomenclatura

- **Iconos**: Utilizar EXCLUSIVAMENTE iconos vectoriales SVG (`lucide-react`). Prohibidos los emojis.
- **Páginas**: `HomePage.jsx`, `ProductDetailPage.jsx`, `CartPage.jsx`, `CategoryPage.jsx`.
