import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, ShieldCheck, Heart, Beef, Layers, Drumstick, Egg, Utensils, Apple, ShoppingBag, Wine, MessageCircle } from 'lucide-react';
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
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-24 md:pb-12 border-t-4 border-green-600">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        
        {/* Columna 1: Marca e info con Logo Oficial */}
        <div>
          <div className="mb-4">
            <Logo className="w-10 h-10" showText={true} />
            <p className="text-xs text-gray-400 mt-1 font-semibold">RIF: {COMPANY_INFO.rif}</p>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            {COMPANY_INFO.tagline} Carnes de primera, pollo fresco, quesos criollos, cosechas y víveres de la mejor calidad en Alto Barinas.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <MessageCircle size={15} />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Columna 2: Categorías rápidas (Vector Icons) */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 border-b border-gray-800 pb-2">
            Categorías de Productos
          </h4>
          <ul className="space-y-2 text-xs">
            {PRODUCT_CATEGORIES.map(cat => {
              const IconComponent = ICON_MAP[cat.iconName] || ShoppingBag;
              return (
                <li key={cat.id}>
                  <Link to={`/categoria/${cat.id}`} className="hover:text-green-400 transition-colors flex items-center gap-2">
                    <IconComponent size={14} className="text-green-500" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Columna 3: Ubicación y Horarios */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 border-b border-gray-800 pb-2">
            Ubicación y Atención
          </h4>
          <ul className="space-y-3 text-xs text-gray-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="text-green-500 shrink-0 mt-0.5" size={16} />
              <span>{COMPANY_INFO.address}, {COMPANY_INFO.city}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="text-green-500 shrink-0" size={16} />
              <span>{COMPANY_INFO.hours}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="text-green-500 shrink-0" size={16} />
              <span>{COMPANY_INFO.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Instagram className="text-green-500 shrink-0" size={16} />
              <span>{COMPANY_INFO.instagram}</span>
            </li>
          </ul>
        </div>

        {/* Columna 4: Garantía y Métodos de Pago */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 border-b border-gray-800 pb-2">
            Garantía y Confianza
          </h4>
          <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-800 mb-3 text-xs space-y-2">
            <div className="flex items-center gap-2 text-green-400 font-semibold">
              <ShieldCheck size={18} />
              <span>Frescura Garantizada</span>
            </div>
            <p className="text-gray-400">
              Productos seleccionados directamente del campo a tu hogar. Despacho en {COMPANY_INFO.deliveryTime}.
            </p>
          </div>
          <p className="text-[11px] text-gray-500">
            Aceptamos Pago Móvil, Zelle, Transferencias y Efectivo.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.</p>
        <p className="flex items-center gap-1">
          Hecho con <Heart size={12} className="text-red-500 fill-red-500" /> en Barinas, Venezuela.
        </p>
      </div>
    </footer>
  );
}
