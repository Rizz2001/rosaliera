import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, ShieldCheck, Truck, MessageCircle, Tag, CheckCircle2, MapPin, CreditCard, User, Phone, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { formatWhatsAppMessage } from '../utils/formatWhatsAppMessage';

export function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  // Estado del Formulario de Entrega embebido en la página
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: 'Alto Barinas, Barinas',
    paymentMethod: 'Pago Móvil',
    notes: ''
  });

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const freeShippingThreshold = 25.0;
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;
  const isFreeShipping = remainingForFreeShipping <= 0;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'ROSALIERA10') {
      setDiscount(cartTotal * 0.10); // 10% Descuento
      setCouponApplied(true);
    } else {
      alert('Código no válido. Prueba usando: ROSALIERA10');
    }
  };

  const finalTotal = Math.max(0, cartTotal - discount);

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor, ingresa tu nombre completo para continuar.');
      return;
    }

    const whatsappUrl = formatWhatsAppMessage(cartItems, formData, finalTotal + (isFreeShipping ? 0 : 2.00));
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  return (
    <div className="bg-gray-50/70 min-h-screen py-8 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Enlace para volver */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-green-700 mb-6 bg-white px-3.5 py-2 rounded-full border border-gray-200 shadow-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Seguir Comprando</span>
        </Link>

        {/* Header con Indicador de Pasos Estilo Farmatodo */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-2.5">
              <ShoppingBag className="text-green-600" size={26} />
              <span>Mi Carrito y Proceso de Compra</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Revisa tus productos y completa tus datos de envío directamente en esta página
            </p>
          </div>

          {/* Indicadores de Pasos en la Página */}
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-green-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="w-5 h-5 rounded-full bg-white text-green-700 flex items-center justify-center text-[11px] font-extrabold">1</span>
              <span>Productos</span>
            </span>
            <span className="text-gray-300">→</span>
            <span className="bg-green-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="w-5 h-5 rounded-full bg-white text-green-700 flex items-center justify-center text-[11px] font-extrabold">2</span>
              <span>Datos Entrega</span>
            </span>
            <span className="text-gray-300">→</span>
            <span className="bg-emerald-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="w-5 h-5 rounded-full bg-white text-emerald-700 flex items-center justify-center text-[11px] font-extrabold">3</span>
              <span>WhatsApp</span>
            </span>
          </div>
        </div>

        {/* Banner de Despacho Express */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl p-4 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-green-200">
                Despacho Directo en Alto Barinas
              </h4>
              <p className="text-xs text-white">
                {isFreeShipping
                  ? '¡Felicidades! Tu pedido califica para ENVÍO GRATIS a domicilio.'
                  : `Faltan ${formatCurrency(remainingForFreeShipping)} para obtener Envío Gratis (Superando ${formatCurrency(freeShippingThreshold)}).`}
              </p>
            </div>
          </div>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 whitespace-nowrap">
            ⏱ Entrega en 30-45 min
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* Carrito Vacío */
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto my-8">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={36} />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-xs text-gray-500 mb-6">
              Aún no has agregado productos de Alimentos La Rosaliera. Explora nuestro catálogo de carnes, quesos, pollo y víveres frescos.
            </p>
            <Link
              to="/"
              style={{ backgroundColor: '#58A618' }}
              className="hover:bg-green-600 text-white text-xs md:text-sm font-bold px-6 py-3.5 rounded-full shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Explorar Catálogo de Productos</span>
            </Link>
          </div>
        ) : (
          /* Grid del Carrito y Formulario Embebido en la Página */
          <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Columna Izquierda: Lista de Productos + Formulario Embebido */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Bloque 1: Lista de Productos */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div className="pb-3 border-b border-gray-100 flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                  <span>1. Productos Seleccionados ({cartItems.length})</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold normal-case"
                  >
                    <Trash2 size={13} /> Vaciar Carrito
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="flex items-center gap-3.5">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-2xl border border-gray-100 shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-extrabold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                            {item.categoryName}
                          </span>
                          <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-1">{item.name}</h3>
                          <p className="text-xs text-gray-500 font-medium">
                            {formatCurrency(item.price)} por {item.unit}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-lg shadow-2xs transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-3 text-xs font-bold text-gray-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-lg shadow-2xs transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <span className="text-sm font-extrabold text-gray-900 block">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Bloque 2: Formulario de Datos de Entrega Integrado en la Página (Sin Modales) */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div className="pb-3 border-b border-gray-100">
                  <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                    <MapPin className="text-green-600" size={18} />
                    <span>2. Datos de Entrega y Pago (Alto Barinas)</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Ingresa tus datos para generar el pedido directo a nuestro WhatsApp
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <User size={13} className="text-green-600" />
                      <span>Nombre Completo *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. María Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:bg-white focus:border-green-600 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <Phone size={13} className="text-green-600" />
                      <span>Teléfono de Contacto</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej. 0414-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:bg-white focus:border-green-600 transition-all font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <MapPin size={13} className="text-green-600" />
                      <span>Dirección Exacta de Entrega en Barinas</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ej. Urb. Alto Barinas Norte, Calle principal, Casa #45"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:bg-white focus:border-green-600 transition-all resize-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <CreditCard size={13} className="text-green-600" />
                      <span>Método de Pago Preferido</span>
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:bg-white focus:border-green-600 transition-all font-medium"
                    >
                      <option value="Pago Móvil">📱 Pago Móvil</option>
                      <option value="Zelle">💵 Zelle</option>
                      <option value="Efectivo en Divisas">💵 Efectivo al recibir (Divisas / USD)</option>
                      <option value="Transferencia Bancaria">🏦 Transferencia Bancaria</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <FileText size={13} className="text-green-600" />
                      <span>Notas Adicionales (Opcional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Por favor picar la carne en bistec delgado"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:bg-white focus:border-green-600 transition-all font-medium"
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* Resumen del Pedido (Columna Derecha en la Página) */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg space-y-6 sticky top-24">
              <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                3. Resumen y Confirmación
              </h2>

              {/* Formulario de Cupón de Descuento */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Tag size={14} className="text-green-600" />
                  <span>Código de Descuento</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ej. ROSALIERA10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:border-green-600 uppercase font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-green-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> ¡10% de descuento aplicado con éxito!
                  </p>
                )}
              </div>

              {/* Desglose Financiero */}
              <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} productos)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(cartTotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-700 font-bold">
                    <span>Descuento Promocional</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Despacho en Alto Barinas</span>
                  <span className="font-semibold text-green-700">
                    {isFreeShipping ? 'GRATIS' : '$2.00'}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total Final a Pagar</span>
                  <span className="text-green-700 text-xl">{formatCurrency(finalTotal + (isFreeShipping ? 0 : 2.00))}</span>
                </div>
              </div>

              {/* Botón Principal Integrado en la Página (Sin Popups) */}
              <button
                type="submit"
                style={{ backgroundColor: '#25D366' }}
                className="w-full hover:brightness-105 text-white font-bold text-xs md:text-sm py-4 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                <span>Enviar Pedido por WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 text-center">
                <ShieldCheck size={14} className="text-green-600" />
                <span>Tu pedido se enviará listo para despacho a Alimentos La Rosaliera</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
