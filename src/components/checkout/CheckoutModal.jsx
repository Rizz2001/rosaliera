import React, { useState } from 'react';
import { X, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatWhatsAppMessage } from '../../utils/formatWhatsAppMessage';

export function CheckoutModal() {
  const { cartItems, cartTotal, isCheckoutOpen, setIsCheckoutOpen, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: 'Alto Barinas, Barinas',
    paymentMethod: 'Pago Móvil',
    notes: ''
  });

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor, ingresa tu nombre completo.');
      return;
    }

    const whatsappUrl = formatWhatsAppMessage(cartItems, formData, cartTotal);
    window.open(whatsappUrl, '_blank');
    
    // Opcional: limpiar carrito y cerrar modal tras abrir WhatsApp
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-fade-in my-8">
        
        {/* Header del Modal */}
        <div style={{ backgroundColor: '#58A618' }} className="p-4 md:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MessageCircle size={24} />
            <div>
              <h3 className="text-base font-bold">Finalizar Pedido por WhatsApp</h3>
              <p className="text-xs text-green-100">Alimentos La Rosaliera - Alto Barinas</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
          
          {/* Resumen Corto del Pedido */}
          <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-500 font-medium">Total a pagar ({cartItems.length} productos):</span>
              <div className="text-lg font-extrabold text-green-700">{formatCurrency(cartTotal)}</div>
            </div>
            <span className="bg-green-100 text-green-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
              Confirmación Inmediata
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Nombre Completo *</label>
              <input
                type="text"
                required
                placeholder="Ej. María Pérez"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs focus:bg-white focus:border-green-600 transition-all"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Teléfono de Contacto</label>
              <input
                type="tel"
                placeholder="Ej. 0414-1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs focus:bg-white focus:border-green-600 transition-all"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Dirección de Entrega en Barinas</label>
              <textarea
                rows={2}
                placeholder="Ej. Urb. Alto Barinas Norte, Calle principal, Casa #45"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs focus:bg-white focus:border-green-600 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Método de Pago Preferido</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs focus:bg-white focus:border-green-600 transition-all"
              >
                <option value="Pago Móvil">📱 Pago Móvil</option>
                <option value="Zelle">💵 Zelle</option>
                <option value="Efectivo en Divisas">💵 Efectivo al recibir (Divisas / USD)</option>
                <option value="Transferencia Bancaria">🏦 Transferencia Bancaria</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Notas Adicionales (Opcional)</label>
              <input
                type="text"
                placeholder="Ej. Por favor cortar la carne en bistec delgado"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs focus:bg-white focus:border-green-600 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: '#25D366' }}
            className="w-full hover:brightness-105 text-white text-xs md:text-sm font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            <MessageCircle size={18} />
            <span>Enviar Pedido por WhatsApp</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 text-center">
            <ShieldCheck size={14} className="text-green-600" />
            <span>Tu pedido se enviará formateado directamente al chat oficial de La Rosaliera</span>
          </div>

        </form>

      </div>
    </div>
  );
}
