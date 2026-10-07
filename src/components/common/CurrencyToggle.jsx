import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export function CurrencyToggle({ className = '' }) {
  const { currency, setCurrency, bcvRate, rateLoading } = useCurrency();

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Insignia Tasa BCV Oficial */}
      <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse"></span>
        <span>BCV: Bs. {bcvRate.toFixed(2)}</span>
        {rateLoading && <RefreshCw size={10} className="animate-spin text-green-200" />}
      </div>

      {/* Switch Pill Dual $ USD / Bs. BCV */}
      <div className="bg-black/20 p-0.5 rounded-full border border-white/20 flex items-center shrink-0">
        <button
          type="button"
          onClick={() => setCurrency('USD')}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition-all ${
            currency === 'USD'
              ? 'bg-white text-gray-900 shadow-2xs'
              : 'text-white/80 hover:text-white'
          }`}
        >
          $ USD
        </button>
        <button
          type="button"
          onClick={() => setCurrency('VES')}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition-all ${
            currency === 'VES'
              ? 'bg-white text-gray-900 shadow-2xs'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Bs. BCV
        </button>
      </div>
    </div>
  );
}
