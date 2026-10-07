/**
 * Esqueleto de Datos Mock - Alimentos La Rosaliera
 * Estandarizado para fácil sustitución por la API del sistema de inventario.
 */

export const MOCK_PRODUCTS = [
  {
    id: "prod-001",
    slug: "solomo-de-cuerito-kg",
    name: "Solomo de Cuerito de Res",
    category: "carne-de-res",
    categoryName: "Carne de Res",
    price: 9.50,
    originalPrice: 11.00,
    unit: "kg",
    stock: 35,
    inStock: true,
    isOffer: true,
    isFresh: true,
    rating: 4.9,
    description: "Carne de res seleccionada de primera calidad, jugosa y de excelente sabor. Corte tierno especial para asados, parrilla o plancha.",
    images: [
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      origen: "Ganadería Alto Barinas",
      temperatura: "Refrigerado 0°C a 4°C"
    }
  },
  {
    id: "prod-002",
    slug: "punta-de-trasero-kg",
    name: "Punta de Trasero de Res Premium",
    category: "carne-de-res",
    categoryName: "Carne de Res",
    price: 11.80,
    originalPrice: 13.50,
    unit: "kg",
    stock: 20,
    inStock: true,
    isOffer: true,
    isFresh: true,
    rating: 5.0,
    description: "Corte estrella para la parrilla. Capa perfecta de grasa para garantizar máxima jugosidad y textura inigualable.",
    images: [
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      origen: "Ganadería Selección La Rosaliera",
      corte: "Punta de Trasero / Picanha"
    }
  },
  {
    id: "prod-003",
    slug: "carne-molida-primera-kg",
    name: "Carne Molida de Primera",
    category: "carne-de-res",
    categoryName: "Carne de Res",
    price: 6.80,
    originalPrice: null,
    unit: "kg",
    stock: 50,
    inStock: true,
    isOffer: false,
    isFresh: true,
    rating: 4.8,
    description: "Carne molida magra de res sin exceso de grasa, procesada diariamente bajo estrictos estándares de higiene.",
    images: [
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      grasa: "Menos del 10%",
      uso: "Pastas, guisos, hamburguesas"
    }
  },
  {
    id: "prod-004",
    slug: "queso-blanco-duro-paisa-kg",
    name: "Queso Blanco Duro Criollo",
    category: "quesos-lacteos",
    categoryName: "Quesos y Lácteos",
    price: 6.50,
    originalPrice: 7.50,
    unit: "kg",
    stock: 60,
    inStock: true,
    isOffer: true,
    isFresh: true,
    rating: 4.9,
    description: "Queso blanco duro artesanal de punto perfecto de sal. Ideal para rallar en arepas, empanadas y pabellón.",
    images: [
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      tipo: "Llanero Duro",
      origen: "Fincas de Barinas"
    }
  },
  {
    id: "prod-005",
    slug: "suero-aliñado-llanero-500g",
    name: "Suero de Leche Aliñado 500g",
    category: "quesos-lacteos",
    categoryName: "Quesos y Lácteos",
    price: 2.20,
    originalPrice: null,
    unit: "unidad",
    stock: 40,
    inStock: true,
    isOffer: false,
    isFresh: true,
    rating: 5.0,
    description: "Cremoso suero de leche casero preparado con especias frescas. El acompañante tradicional e indispensable de la mesa venezolana.",
    images: [
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      presentacion: "Envase sellado 500g",
      conservacion: "Mantener refrigerado"
    }
  },
  {
    id: "prod-006",
    slug: "pechuga-de-pollo-deshuesada-kg",
    name: "Pechuga de Pollo Deshuesada",
    category: "pollo",
    categoryName: "Pollo Fresco",
    price: 5.40,
    originalPrice: 6.20,
    unit: "kg",
    stock: 45,
    inStock: true,
    isOffer: true,
    isFresh: true,
    rating: 4.9,
    description: "Pechuga de pollo fresca, limpia, sin piel ni huesos. Lista para empanizar, asar a la plancha o desmenuzar.",
    images: [
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      estado: "Fresco del día",
      corte: "Filet / Pechuga limpia"
    }
  },
  {
    id: "prod-007",
    slug: "carton-de-huevos-frescos-30",
    name: "Cartón de Huevos Frescos (30 und)",
    category: "huevos",
    categoryName: "Huevos",
    price: 5.20,
    originalPrice: 5.80,
    unit: "cartón",
    stock: 80,
    inStock: true,
    isOffer: true,
    isFresh: true,
    rating: 4.9,
    description: "Cartón de 30 huevos seleccionados de granja tamaño AAA, 100% frescos de alto valor proteico.",
    images: [
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      tamaño: "Clase AAA Grande",
      cantidad: "30 Unidades"
    }
  },
  {
    id: "prod-008",
    slug: "chuleta-de-cerdo-ahumada-kg",
    name: "Chuleta de Cerdo Ahumada",
    category: "cerdos",
    categoryName: "Cerdos / Charcutería",
    price: 7.20,
    originalPrice: null,
    unit: "kg",
    stock: 25,
    inStock: true,
    isOffer: false,
    isFresh: true,
    rating: 4.8,
    description: "Chuletas de cerdo jugosas ahumadas con maderas aromáticas naturales. Gran aroma y sabor intenso.",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      tipo: "Ahumado artesanal",
      empaque: "Al vacío"
    }
  },
  {
    id: "prod-009",
    slug: "tomate-manzano-fresco-kg",
    name: "Tomate Manzano de Cosecha",
    category: "cosechas",
    categoryName: "Cosechas y Hortalizas",
    price: 1.80,
    originalPrice: 2.20,
    unit: "kg",
    stock: 100,
    inStock: true,
    isOffer: true,
    isFresh: true,
    rating: 4.7,
    description: "Tomates rojos y firmes recién cosechados en el campo. Ideales para ensaladas, salsas caseras y guisos.",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      origen: "Cosecha Local Barinas",
      calidad: "Grado A Selección"
    }
  },
  {
    id: "prod-010",
    slug: "harina-pan-blanca-1kg",
    name: "Harina PAN Blanca 1kg",
    category: "punto-verde",
    categoryName: "Punto Verde / Víveres",
    price: 1.35,
    originalPrice: null,
    unit: "unidad",
    stock: 150,
    inStock: true,
    isOffer: false,
    isFresh: false,
    rating: 5.0,
    description: "La auténtica Harina de Maíz Blanco Precocida para preparar las mejores arepas y hallacas venezolanas.",
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      peso: "1 kilogramo",
      marca: "P.A.N."
    }
  },
  {
    id: "prod-011",
    slug: "aceite-vegetal-girasol-1l",
    name: "Aceite Vegetal Puro 1L",
    category: "punto-verde",
    categoryName: "Punto Verde / Víveres",
    price: 2.90,
    originalPrice: 3.40,
    unit: "unidad",
    stock: 90,
    inStock: true,
    isOffer: true,
    isFresh: false,
    rating: 4.8,
    description: "Aceite vegetal 100% refinado para freír y cocinar saludables platillos en familia.",
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      volumen: "1 Litro",
      tipo: "Girasol / Soya"
    }
  },
  {
    id: "prod-012",
    slug: "sangria-carorena-175l",
    name: "Sangría Caroreña 1.75L",
    category: "licores",
    categoryName: "Licores y Delicateses",
    price: 8.50,
    originalPrice: 9.90,
    unit: "botella",
    stock: 30,
    inStock: true,
    isOffer: true,
    isFresh: false,
    rating: 4.9,
    description: "Sangría venezolana con un toque frutal característico. Perfecta para servir bien fría en reuniones familiares y parrillas.",
    images: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      contenido: "1.75 Litros",
      gradoAlcohol: "9% Vol"
    }
  }
];
