import React from 'react';
import { Truck, ShieldCheck, Award, MessageCircle } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: <Truck className="text-green-600" size={26} />,
      title: "Despacho a Domicilio",
      desc: "Envíos rápidos directos a tu hogar en Alto Barinas."
    },
    {
      icon: <Award className="text-green-600" size={26} />,
      title: "Del Campo a tu Mesa",
      desc: "Carnes y cosechas seleccionadas con la mayor higiene."
    },
    {
      icon: <ShieldCheck className="text-green-600" size={26} />,
      title: "Garantía de Frescura",
      desc: "Rubros procesados y refrigerados al instante."
    },
    {
      icon: <MessageCircle className="text-green-600" size={26} />,
      title: "Atención por WhatsApp",
      desc: "Pedidos sencillos con confirmación inmediata."
    }
  ];

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((b, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all">
            <div className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-100 shrink-0">
              {b.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-tight mb-0.5">{b.title}</h4>
              <p className="text-[11px] text-gray-500 leading-tight">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
