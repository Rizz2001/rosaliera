import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, ShieldCheck, Truck, MessageCircle, Tag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { COMPANY_INFO } from '../config/constants';

export function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart, setIsCheckoutOpen } = useCart();
  const navigate = useNavigate();

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
              <span>Mi Carrito de Compras</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Revisa tus productos seleccionados y confirma tu entrega en Alto Barinas
            </p>
          </div>

          {/* Indicadores de Pasos */}
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-green-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="w-5 h-5 rounded-full bg-white text-green-700 flex items-center justify-center text-[11px] font-extrabold">1</span>
              <span>Mi Carrito</span>
            </span>
            <span className="text-gray-300">→</span>
            <span className="bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-[11px] font-extrabold">2</span>
              <span>Datos Entrega</span>
            </span>
            <span className="text-gray-300">→</span>
            <span className="bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-[11px] font-extrabold">3</span>
              <span>WhatsApp</span>
            </span>
          </div>
        </div>

        {/* Notificación de Envío Express Estilo Farmatodo */}
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
          /* Grid del Carrito (Tabla a la izquierda, resumen a la derecha) */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Lista Detallada de Productos (2 Columnas) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm divide-y divide-gray-100">
                <div className="pb-4 flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                  <span>Producto ({cartItems.length})</span>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold normal-case"
                  >
                    <Trash2 size={13} /> Vaciar Carrito
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Info de Producto */}
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

                    {/* Selector de Cantidad + Subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-lg shadow-2xs transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-900">{item.quantity}</span>
                        <button
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

            {/* Resumen del Pedido (1 Columna en Desktop) */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg space-y-6 sticky top-24">
              <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                Resumen del Pedido
              </h2>

              {/* Formulario de Cupón de Descuento */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
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
                    type="submit"
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
              </form>

              {/* Desglose Financiero */}
              <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal de Productos</span>
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
                  <span>Total Final</span>
                  <span className="text-green-700 text-xl">{formatCurrency(finalTotal + (isFreeShipping ? 0 : 2.00))}</span>
                </div>
              </div>

              {/* Botón Principal de Checkout por WhatsApp */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                style={{ backgroundColor: '#58A618' }}
                className="w-full hover:bg-green-600 text-white font-bold text-xs md:text-sm py-4 px-4 rounded-2xl shadow-lg hover:shadow-green-600/30 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                <span>Proceder al Checkout por WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 text-center">
                <ShieldCheck size={14} className="text-green-600" />
                <span>Atención personalizada e inmediata en Barinas</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
