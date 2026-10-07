import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';

export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 25.0;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-right">
          
          {/* Header del Carrito */}
          <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-green-600" size={22} />
              <h2 className="text-base font-bold text-gray-900">Tu Carrito de Compras</h2>
              <span className="bg-green-100 text-green-700 text-xs font-extrabold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar de Envío Gratis */}
          <div className="bg-green-50/70 p-3 px-6 border-b border-green-100">
            <div className="flex justify-between items-center text-xs font-semibold mb-1">
              <span className="text-green-800">
                {remainingForFreeShipping <= 0
                  ? '🎉 ¡Felicidades! Tienes Despacho GRATIS'
                  : `Faltan ${formatCurrency(remainingForFreeShipping)} para Envío Gratis`}
              </span>
            </div>
            <div className="w-full bg-green-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-green-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Lista de Ítems */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 divide-y divide-gray-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-3 text-2xl">
                  🛒
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">Tu carrito está vacío</h3>
                <p className="text-xs text-gray-500 mb-4">¡Agrega cortes de carne fresca, quesos o víveres para comenzar!</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 flex gap-3 items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border border-gray-100 shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-green-700 font-extrabold my-0.5">
                      {formatCurrency(item.price)} <span className="text-[10px] text-gray-400 font-normal">/ {item.unit}</span>
                    </p>

                    {/* Controles de Cantidad */}
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 text-gray-600 transition-colors rounded-l-lg"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 text-gray-600 transition-colors rounded-r-lg"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500 font-semibold">
                        = {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Eliminar Ítem */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                    title="Eliminar producto"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer del Carrito (Subtotal y Botón Checkout) */}
          {cartItems.length > 0 && (
            <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Envío a Domicilio</span>
                  <span className="text-green-600 font-semibold">
                    {remainingForFreeShipping <= 0 ? 'GRATIS' : 'Calculado en Checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Estimado</span>
                  <span className="text-green-700 text-base">{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                style={{ backgroundColor: '#58A618' }}
                className="w-full hover:bg-green-600 text-white font-bold text-xs md:text-sm py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceder al Checkout</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                <ShieldCheck size={14} className="text-green-600" />
                <span>Compra protegida y confirmada directamente por WhatsApp</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
