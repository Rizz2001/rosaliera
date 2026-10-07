import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ChevronDown, HelpCircle, MapPin, 
  Smartphone, Clock, Banknote, ShieldCheck, MessageCircle 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { COMPANY_INFO } from '../config/constants';

export function FaqPage() {
  const { bcvRate } = useCurrency();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      icon: MapPin,
      question: '¿En qué zonas de Barinas realizan despachos express?',
      answer: 'Realizamos entregas a domicilio en Alto Barinas (Norte y Sur), Urb. Don Samuel, Las Cumbres, Los Arroyos, Av. Italia, Av. Francia, El Pilar, Centro de Barinas y zonas residenciales aledañas.'
    },
    {
      icon: Banknote,
      question: '¿Cómo se calcula el pago en Bolívares (Bs.)?',
      answer: `Todos los precios en Bolívares se calculan automáticamente con la Tasa Oficial BCV del día en tiempo real (Tasa actual de referencia: ${bcvRate.toFixed(2)} Bs/$). Puedes alternar entre $ USD y Bs. usando el botón selector en la parte superior de la página.`
    },
    {
      icon: Smartphone,
      question: '¿Cuáles son los métodos de pago aceptados?',
      answer: 'Aceptamos Pago Móvil (a tasa oficial BCV), Efectivo en USD (al recibir tu pedido en Barinas), Zelle en dólares y Transferencia Bancaria (Banesco y Mercantil).'
    },
    {
      icon: Clock,
      question: '¿Cuál es el tiempo promedio de entrega de los pedidos?',
      answer: 'El tiempo promedio de entrega es de 30 a 45 minutos en la zona de Alto Barinas. Para otras zonas residenciales de Barinas, la entrega se efectúa entre 45 y 60 minutos.'
    },
    {
      icon: ShieldCheck,
      question: '¿Cómo garantizan la frescura de los cortes de carne y quesos?',
      answer: 'Nuestras carnes de res y pollo son seleccionadas a diario y mantenidas bajo una estricta cadena de frío. Los empacamos de forma higiénica y hermética justo antes de salir a despacho.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50/60 min-h-screen py-8 pb-28">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        
        {/* Enlace de Regreso */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-green-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-2xs hover:shadow-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Volver a la Tienda</span>
        </Link>

        {/* Encabezado Principal */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mx-auto shadow-xs">
            <HelpCircle size={26} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900">
            Preguntas Frecuentes (FAQ)
          </h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-lg mx-auto">
            Resuelve todas tus dudas sobre zonas de despacho, métodos de pago, cálculo de tasa BCV y tiempos de entrega en Barinas.
          </p>
        </div>

        {/* Lista de Preguntas Desplegables (Accordion) */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const IconComp = faq.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 hover:text-green-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${isOpen ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700'}`}>
                      <IconComp size={18} />
                    </div>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-green-600' : 'text-gray-400'}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tarjeta de Soporte por WhatsApp */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md text-center space-y-3">
          <h3 className="text-sm font-bold text-gray-900">¿Tienes alguna duda adicional?</h3>
          <p className="text-xs text-gray-500">Nuestro equipo en Barinas está disponible para atenderte en tiempo real.</p>
          <div>
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: '#25D366' }}
              className="inline-flex items-center gap-2 hover:brightness-105 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all"
            >
              <MessageCircle size={16} />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
