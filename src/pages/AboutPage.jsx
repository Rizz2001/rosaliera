import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, Heart, Award, Sparkles, 
  MapPin, Truck, CheckCircle2, Users, Building2 
} from 'lucide-react';
import { COMPANY_INFO } from '../config/constants';

export function AboutPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Frescura 100% Garantizada',
      desc: 'Seleccionamos a diario cortes de carne y lácteos bajo estrictas normas de cadena de frío e higiene.'
    },
    {
      icon: Heart,
      title: 'Tradición Llanera',
      desc: 'Llevamos lo mejor del campo llanero de Barinas directamente a la mesa de cada hogar barinés.'
    },
    {
      icon: Award,
      title: 'Calidad Extra Premium',
      desc: 'Trabajamos con productores locales garantizando cortes de res tiernos, pollo fresco y queso artesanal.'
    },
    {
      icon: Truck,
      title: 'Despacho Express Barinas',
      desc: 'Entregas rápidas en 30 a 45 minutos con empaques herméticos que protegen la calidad de los alimentos.'
    }
  ];

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
      title: 'Selección de Carnes Premium',
      subtitle: 'Cortes limpios y empacados al vacío'
    },
    {
      url: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&q=80&w=800',
      title: 'Quesos y Lácteos de Origen',
      subtitle: 'Queso llanero tradicional elaborado a diario'
    },
    {
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
      title: 'Combos Familiares',
      subtitle: 'La combinación perfecta para tu semana'
    }
  ];

  return (
    <div className="bg-gray-50/60 min-h-screen py-8 pb-28">
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
        
        {/* Volver */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-green-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-2xs hover:shadow-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Volver al Catálogo</span>
        </Link>

        {/* Banner Hero Principal */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 via-green-950 to-gray-900 text-white p-8 md:p-14 border border-green-800/40 shadow-xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-green-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-green-600/90 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              <Sparkles size={13} className="text-amber-300" />
              <span>Nuestra Historia & Compromiso</span>
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Alimentos <span className="text-green-400">La Rosaliera</span>
            </h1>

            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              "Del campo llanero a tu mesa". Nacimos en Barinas con la firme misión de llevar a las familias barinesas alimentos frescos, nutritivos y procesados bajo los más exigentes estándares de higiene y calidad.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <MapPin size={14} className="text-green-400" />
                <span>Alto Barinas, Barinas</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <Building2 size={14} className="text-amber-400" />
                <span>RIF: {COMPANY_INFO.rif}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Valores y Pilares */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xl md:text-2xl font-black text-gray-900">
              Nuestros Pilares de Calidad
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              En Alimentos La Rosaliera trabajamos para garantizar frescura impecable en cada pedido que llega a tu hogar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-green-300 hover:shadow-md transition-all space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                    <IconComp size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Galería Visual de Instalaciones y Selección */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-black text-gray-900">
                Procesos de Selección y Empaque
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Conoce el cuidado con el que preparamos tus alimentos en Barinas
              </p>
            </div>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              Garantía Sanitaria 100%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden aspect-4/3 border border-gray-100 shadow-md">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent p-4 flex flex-col justify-end text-white">
                  <h4 className="text-sm font-bold">{img.title}</h4>
                  <p className="text-[11px] text-gray-300">{img.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Llamado a la Acción */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-800 rounded-3xl p-8 text-white text-center shadow-lg space-y-4">
          <h3 className="text-xl md:text-2xl font-black">
            ¿Listo para llevar la mejor frescura a tu hogar?
          </h3>
          <p className="text-xs md:text-sm text-green-100 max-w-lg mx-auto">
            Haz tu pedido en línea y recíbelo en la puerta de tu casa en Alto Barinas en menos de 45 minutos.
          </p>
          <div>
            <Link
              to="/"
              style={{ backgroundColor: '#58A618' }}
              className="inline-flex items-center gap-2 hover:bg-green-600 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md transition-all"
            >
              <span>Explorar Catálogo de Productos</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
