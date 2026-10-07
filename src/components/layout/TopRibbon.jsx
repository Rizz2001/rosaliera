import React from 'react';
import { Truck, Sparkles, MapPin } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export function TopRibbon() {
  const { bcvRate } = useCurrency();

  return (
    <div className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 text-white text-[11px] font-semibold py-1.5 px-4 shadow-2xs border-b border-green-700/50">
      <div className="container mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
        
        {/* Lado Izquierdo: Mensaje de Envíos */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <Sparkles size={10} /> Oferta Especial
          </span>
          <span className="truncate">
            🚀 Envíos <strong className="text-green-300">GRATIS</strong> en Barinas por compras superiores a $25
          </span>
        </div>

        {/* Lado Derecho: Tasa BCV & Ubicación */}
        <div className="hidden md:flex items-center gap-4 text-gray-200">
          <div className="flex items-center gap-1.5">
            <Truck size={13} className="text-green-400" />
            <span>Entrega Express 30-45 min</span>
          </div>

          <span className="text-green-600">•</span>

          <div className="flex items-center gap-1">
            <MapPin size={13} className="text-red-400" />
            <span>Alto Barinas, Barinas</span>
          </div>

          <span className="text-green-600">•</span>

          <div className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 text-white font-bold">
            Tasa BCV: <span className="text-green-300">{bcvRate.toFixed(2)} Bs/$</span>
          </div>
        </div>

      </div>
    </div>
  );
}
