import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO as DEFAULT_COMPANY_INFO } from '../config/constants';

const CompanyContext = createContext();
const LOCAL_STORAGE_COMPANY_KEY = 'rosaliera_company_info';
const LOCAL_STORAGE_BANNERS_KEY = 'rosaliera_custom_banners';

const DEFAULT_BANNERS = [
  {
    id: 1,
    title: '¡Frescura y Calidad Llanera!',
    subtitle: 'Carnes de res de primera seleccionadas a diario en Barinas.',
    badge: 'Cortes Premium',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'Ver Carnicería',
    ctaCategory: 'carnes'
  },
  {
    id: 2,
    title: 'Quesos Llaneros y Lácteos Frescos',
    subtitle: 'Queso duro, semiduro y crema de la mejor calidad tradicional.',
    badge: '100% Artesanal',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'Explorar Lácteos',
    ctaCategory: 'lacteos'
  },
  {
    id: 3,
    title: 'Combos Especiales La Rosaliera',
    subtitle: 'Packs armados con todo lo que necesitas para tu hogar.',
    badge: 'Mejor Precio',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'Ver Promociones',
    ctaCategory: 'combos'
  }
];

export function CompanyProvider({ children }) {
  // Estado de Información de la Empresa
  const [companyInfo, setCompanyInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_COMPANY_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY_INFO;
    } catch (e) {
      return DEFAULT_COMPANY_INFO;
    }
  });

  // Estado de Banners e Imágenes Rotativas
  const [banners, setBanners] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BANNERS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_BANNERS;
    } catch (e) {
      return DEFAULT_BANNERS;
    }
  });

  // Persistencia de información de la empresa
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COMPANY_KEY, JSON.stringify(companyInfo));
    } catch (e) {
      console.error("Error al guardar información de la empresa", e);
    }
  }, [companyInfo]);

  // Persistencia de banners
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BANNERS_KEY, JSON.stringify(banners));
    } catch (e) {
      console.error("Error al guardar banners", e);
    }
  }, [banners]);

  // Métodos de Modificación CMS
  const updateCompanyInfo = (updatedFields) => {
    setCompanyInfo((prev) => ({ ...prev, ...updatedFields }));
  };

  const updateBanner = (id, updatedFields) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const addBanner = (newBannerData) => {
    const newBanner = {
      id: Date.now(),
      title: newBannerData.title || 'Nueva Promoción',
      subtitle: newBannerData.subtitle || 'Descripción de la oferta especial...',
      badge: newBannerData.badge || 'Oferta',
      image: newBannerData.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600',
      ctaText: newBannerData.ctaText || 'Ver Más',
      ctaCategory: newBannerData.ctaCategory || 'todos'
    };
    setBanners((prev) => [...prev, newBanner]);
  };

  const deleteBanner = (id) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const resetCompanyInfoToDefault = () => {
    setCompanyInfo(DEFAULT_COMPANY_INFO);
    setBanners(DEFAULT_BANNERS);
  };

  return (
    <CompanyContext.Provider
      value={{
        companyInfo,
        banners,
        updateCompanyInfo,
        updateBanner,
        addBanner,
        deleteBanner,
        resetCompanyInfoToDefault
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany debe ser usado dentro de CompanyProvider');
  }
  return context;
}
