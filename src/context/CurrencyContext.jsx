import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

const LOCAL_STORAGE_CURRENCY_KEY = 'rosaliera_currency';
const DEFAULT_BCV_RATE = 45.50; // Tasa de referencia BCV (Bs. / USD)

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_CURRENCY_KEY) || 'USD';
    } catch (e) {
      return 'USD';
    }
  });

  const [bcvRate, setBcvRate] = useState(DEFAULT_BCV_RATE);
  const [rateLoading, setRateLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CURRENCY_KEY, currency);
    } catch (e) {
      console.error("Error al guardar moneda", e);
    }
  }, [currency]);

  // Simulación / consulta de tasa BCV oficial
  useEffect(() => {
    let isMounted = true;
    setRateLoading(true);

    // Intentar consultar API pública de tasa BCV de Venezuela
    fetch('https://ve.dolarapi.com/v1/dolares/oficial')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data && data.promedio) {
          setBcvRate(data.promedio);
        }
        if (isMounted) setRateLoading(false);
      })
      .catch(() => {
        // Fallback a tasa oficial por defecto si falla la red
        if (isMounted) setRateLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'USD' ? 'VES' : 'USD'));
  };

  /**
   * Formatea un monto base en Dólares a la moneda seleccionada (USD o VES)
   * @param {number} amountInUSD - Monto base en USD
   * @param {boolean} [showSymbol=true] - Si muestra la etiqueta $ o Bs.
   * @returns {string} Texto formateado
   */
  const formatPrice = (amountInUSD, showSymbol = true) => {
    if (typeof amountInUSD !== 'number' || isNaN(amountInUSD)) {
      return currency === 'USD' ? '$0.00' : 'Bs. 0,00';
    }

    if (currency === 'VES') {
      const vesAmount = amountInUSD * bcvRate;
      const formatted = vesAmount.toLocaleString('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      return showSymbol ? `Bs. ${formatted}` : formatted;
    }

    const formattedUsd = amountInUSD.toFixed(2);
    return showSymbol ? `$${formattedUsd}` : formattedUsd;
  };

  /**
   * Retorna el texto formateado dual (ej: "$9.50 (Bs. 432,25)")
   */
  const formatPriceDual = (amountInUSD) => {
    if (typeof amountInUSD !== 'number' || isNaN(amountInUSD)) {
      return '$0.00 (Bs. 0,00)';
    }

    const usdPart = `$${amountInUSD.toFixed(2)}`;
    const vesAmount = amountInUSD * bcvRate;
    const vesPart = `Bs. ${vesAmount.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return currency === 'USD' ? `${usdPart} (${vesPart})` : `${vesPart} (${usdPart})`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        bcvRate,
        rateLoading,
        formatPrice,
        formatPriceDual
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency debe ser usado dentro de CurrencyProvider");
  }
  return context;
}
