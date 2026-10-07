import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Clock, Instagram, ShieldCheck, Heart, 
  Beef, Layers, Drumstick, Egg, Utensils, Apple, 
  ShoppingBag, Wine, MessageCircle, ArrowUp, Smartphone, 
  Banknote, Landmark
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { COMPANY_INFO, PRODUCT_CATEGORIES } from '../../config/constants';

const ICON_MAP = {
  Beef: Beef,
  Layers: Layers,
  Drumstick: Drumstick,
  Egg: Egg,
  Utensils: Utensils,
  Apple: Apple,
  ShoppingBag: ShoppingBag,
  Wine: Wine
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-300 pt-14 pb-28 md:pb-12 border-t-4 border-green-600 relative overflow-hidden">
      
      {/* Fondo con brillo suave */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Grid de 4 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Columna 1: Marca & Contacto WhatsApp */}
          <div className="space-y-4">
            <div>
              <Logo className="w-11 h-11" showText={true} dark={true} />
              <p className="text-xs text-gray-400 mt-2 font-semibold">RIF: {COMPANY_INFO.rif}</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {COMPANY_INFO.tagline} Selección de carnes de primera, pollo fresco, quesos criollos, hortalizas y víveres directo a tu hogar en Alto Barinas.
            </p>
            <div>
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all inline-flex items-center gap-2 shadow-md hover:shadow-green-600/30 group"
              >
                <MessageCircle size={16} className="transition-transform group-hover:scale-110" />
                <span>Atención por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Categorías de Productos */}
          <div>
            <h4 className="text-white font-extrabold text-sm mb-4 border-b border-gray-800 pb-2 flex items-center justify-between">
              <span>Categorías</span>
              <span className="text-[10px] text-green-400 font-normal">8 Rubros</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {PRODUCT_CATEGORIES.map(cat => {
                const IconComponent = ICON_MAP[cat.iconName] || ShoppingBag;
                return (
                  <li key={cat.id}>
                    <Link 
                      to={`/categoria/${cat.id}`} 
                      className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 group"
                    >
                      <IconComponent size={14} className="text-green-500 transition-transform group-hover:scale-110 shrink-0" />
                      <span>{cat.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Columna 3: Enlaces Rápidos y Ubicación */}
          <div>
            <h4 className="text-white font-extrabold text-sm mb-4 border-b border-gray-800 pb-2">
              Ubicación y Enlaces
            </h4>
            <ul className="space-y-3 text-xs text-gray-400 mb-4">
              <li>
                <a 
                  href="https://maps.google.com/?q=Alto+Barinas+Barinas+Venezuela" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-green-400 transition-colors group"
                >
                  <MapPin className="text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={16} />
                  <span>{COMPANY_INFO.address}, {COMPANY_INFO.city}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="text-green-500 shrink-0" size={16} />
                <span>{COMPANY_INFO.hours}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="text-green-500 shrink-0" size={16} />
                <span>{COMPANY_INFO.phone}</span>
              </li>
              <li>
                <a
                  href="https://instagram.com/alimentoslarosaliera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-green-400 transition-colors"
                >
                  <Instagram className="text-green-500 shrink-0" size={16} />
                  <span>{COMPANY_INFO.instagram}</span>
                </a>
              </li>
            </ul>

            {/* Accesos Directos a Páginas Clave */}
            <div className="pt-2 border-t border-gray-800/80 flex flex-wrap gap-2.5 text-[11px]">
              <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors font-medium">
                Inicio
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/nosotros" className="text-gray-400 hover:text-green-400 transition-colors font-medium">
                Nosotros
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/faq" className="text-gray-400 hover:text-green-400 transition-colors font-medium">
                Preguntas Frecuentes
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/carrito" className="text-gray-400 hover:text-green-400 transition-colors font-medium">
                Mi Carrito
              </Link>
            </div>
          </div>

          {/* Columna 4: Garantía y Métodos de Pago Visuales */}
          <div>
            <h4 className="text-white font-extrabold text-sm mb-4 border-b border-gray-800 pb-2">
              Garantía y Métodos de Pago
            </h4>
            
            <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 mb-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-green-400 font-bold">
                <ShieldCheck size={18} />
                <span>Cadena de Frío Garantizada</span>
              </div>
              <p className="text-gray-400 text-[11px]">
                Cortes de carne y productos refrigerados procesados bajo estrictas normas de higiene.
              </p>
            </div>

            {/* Badges Visuales de Métodos de Pago */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Formas de Pago Aceptadas:</span>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-700 flex items-center gap-1">
                  <Smartphone size={11} className="text-green-400" /> Pago Móvil
                </span>
                <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-700 flex items-center gap-1">
                  <Banknote size={11} className="text-green-400" /> Efectivo USD
                </span>
                <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-700 flex items-center gap-1">
                  <Banknote size={11} className="text-green-400" /> Zelle
                </span>
                <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-700 flex items-center gap-1">
                  <Landmark size={11} className="text-green-400" /> Transferencia
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Pie de Página Inferior (Copyright & Botón Subir) */}
        <div className="pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1 font-medium text-gray-400">
              Elaborada y diseñada por <span className="text-green-400 font-bold">Aldrin V.</span> - <span className="text-white font-bold">Rizz</span>
            </p>

            {/* Botón Volver Arriba */}
            <button
              onClick={scrollToTop}
              className="bg-gray-800 hover:bg-green-600 text-gray-300 hover:text-white p-2 rounded-full transition-all border border-gray-700 shadow-2xs"
              title="Volver arriba"
              aria-label="Volver arriba"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
