import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, ArrowLeft, ArrowRight, Trash2, Plus, Minus, ShieldCheck, 
  Truck, MessageCircle, Tag, CheckCircle2, MapPin, 
  User, Phone, FileText, Check, Smartphone, Landmark, Banknote, Edit2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { formatWhatsAppMessage } from '../utils/formatWhatsAppMessage';

export function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { formatPrice, formatPriceDual, bcvRate } = useCurrency();

  // Estado del Wizard por Pasos (1: Productos, 2: Entrega y Pago, 3: Confirmación Final)
  const [currentStep, setCurrentStep] = useState(1);

  // Estado del Formulario de Entrega
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
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

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
  const deliveryCost = isFreeShipping ? 0 : 2.00;
  const grandTotal = finalTotal + deliveryCost;

  // Manejadores de Avance de Pasos
  const handleGoToStep2 = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Agrega productos para continuar.');
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToStep3 = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor, ingresa tu nombre completo para continuar.');
      return;
    }
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendToWhatsApp = () => {
    const whatsappUrl = formatWhatsAppMessage(cartItems, formData, grandTotal);
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  // Opciones de Métodos de Pago
  const PAYMENT_OPTIONS = [
    {
      id: 'Pago Móvil',
      title: 'Pago Móvil',
      desc: `Bs. BCV (${bcvRate.toFixed(2)} Bs/$)`,
      badge: 'Más rápido',
      icon: Smartphone
    },
    {
      id: 'Efectivo en Divisas',
      title: 'Efectivo en USD',
      desc: 'Paga al recibir en Barinas',
      badge: 'Sin comisiones',
      icon: Banknote
    },
    {
      id: 'Zelle',
      title: 'Zelle',
      desc: 'Dólares USD',
      badge: 'Transferencia directa',
      icon: Banknote
    },
    {
      id: 'Transferencia Bancaria',
      title: 'Transferencia',
      desc: 'Banesco / Mercantil',
      badge: 'Bancos nacionales',
      icon: Landmark
    }
  ];

  return (
    <div className="bg-gray-50/70 min-h-screen py-8 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Enlace para volver */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-green-700 mb-6 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-2xs hover:shadow-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Volver a la Tienda</span>
        </Link>

        {/* Encabezado Principal con Barra de Pasos Interactiva (Multi-Step Wizard) */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center shadow-xs">
                <ShoppingBag size={22} />
              </div>
              <span>Proceso de Compra</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {currentStep === 1 && 'Paso 1: Revisa tus productos seleccionados'}
              {currentStep === 2 && 'Paso 2: Ingresa tus datos de entrega y método de pago'}
              {currentStep === 3 && 'Paso 3: Confirma tu pedido y envíalo a WhatsApp'}
            </p>
          </div>

          {/* Botones de Pasos Interactivos */}
          <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 text-xs font-bold pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
            {/* Paso 1 */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 transition-all ${
                currentStep === 1
                  ? 'text-green-700 font-extrabold'
                  : currentStep > 1
                  ? 'text-gray-800 hover:text-green-700'
                  : 'text-gray-400'
              }`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-xs ${
                currentStep === 1
                  ? 'bg-green-600 text-white ring-4 ring-green-100'
                  : currentStep > 1
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {currentStep > 1 ? <Check size={14} strokeWidth={3} /> : '1'}
              </span>
              <span className="hidden sm:inline">1. Productos</span>
            </button>
            
            <div className={`h-0.5 w-6 sm:w-10 rounded-full ${currentStep > 1 ? 'bg-green-500' : 'bg-gray-200'}`} />

            {/* Paso 2 */}
            <button
              onClick={() => cartItems.length > 0 && setCurrentStep(2)}
              disabled={cartItems.length === 0}
              className={`flex items-center gap-2 transition-all ${
                currentStep === 2
                  ? 'text-green-700 font-extrabold'
                  : currentStep > 2
                  ? 'text-gray-800 hover:text-green-700'
                  : 'text-gray-400'
              }`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-xs ${
                currentStep === 2
                  ? 'bg-green-600 text-white ring-4 ring-green-100'
                  : currentStep > 2
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {currentStep > 2 ? <Check size={14} strokeWidth={3} /> : '2'}
              </span>
              <span className="hidden sm:inline">2. Entrega & Pago</span>
            </button>

            <div className={`h-0.5 w-6 sm:w-10 rounded-full ${currentStep > 2 ? 'bg-green-500' : 'bg-gray-200'}`} />

            {/* Paso 3 */}
            <div className={`flex items-center gap-2 transition-all ${
              currentStep === 3 ? 'text-emerald-700 font-extrabold' : 'text-gray-400'
            }`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-xs ${
                currentStep === 3
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                3
              </span>
              <span className="hidden sm:inline">3. Confirmar</span>
            </div>
          </div>
        </div>

        {/* Banner de Despacho Express en Barinas */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 text-white rounded-3xl p-5 shadow-md mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-green-200">
                  Despacho Directo en Barinas
                </h4>
                <p className="text-xs text-white">
                  {isFreeShipping
                    ? '🎉 ¡Felicidades! Tu pedido califica para ENVÍO GRATIS a domicilio.'
                    : `Agrega ${formatPrice(remainingForFreeShipping)} más para obtener Envío GRATIS (Superando ${formatPrice(freeShippingThreshold)}).`}
                </p>
              </div>
            </div>

            <span className="bg-white/20 text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/30 whitespace-nowrap backdrop-blur-md">
              ⏱ Entrega en 30-45 min (Alto Barinas)
            </span>
          </div>

          <div className="relative z-10 mt-3 w-full bg-white/20 h-2 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div
              className="bg-white h-full transition-all duration-700 rounded-full shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
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
          /* VISTAS EXCLUSIVAS DEL WIZARD POR PASOS (1, 2 o 3) */
          <div>
            
            {/* ========================================================================= */}
            {/* PASO 1: SELECCIÓN EXCLUSIVA DE PRODUCTOS */}
            {/* ========================================================================= */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
                
                {/* Lista de Productos Seleccionados (Columna Izquierda 2 Cols) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                    <div className="pb-3 border-b border-gray-100 flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-2 text-gray-800">
                        <ShoppingBag size={16} className="text-green-600" />
                        <span>1. Productos Seleccionados ({cartItems.length})</span>
                      </span>
                      <button
                        type="button"
                        onClick={clearCart}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold normal-case transition-colors"
                      >
                        <Trash2 size={13} /> Vaciar Carrito
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {cartItems.map((item) => (
                        <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                          
                          <div className="flex items-center gap-4">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-2xl border border-gray-100 shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div>
                              <span className="text-[10px] font-extrabold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                                {item.categoryName}
                              </span>
                              <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-1">{item.name}</h3>
                              <p className="text-xs text-gray-500 font-medium">
                                {formatPrice(item.price)} por {item.unit}
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
                              <span className="px-3 text-xs font-extrabold text-gray-900">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-lg shadow-2xs transition-colors"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <div className="text-right min-w-[95px]">
                              <span className="text-sm font-extrabold text-gray-900 block">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                              <span className="text-[10px] text-gray-400 font-medium block">
                                {formatPriceDual(item.price * item.quantity)}
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
                </div>

                {/* Resumen del Paso 1 (Columna Derecha 1 Col) */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6">
                  <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                    Resumen de Productos
                  </h2>

                  {/* Cupón */}
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <Tag size={14} className="text-green-600" />
                      <span>¿Tienes un Cupón?</span>
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
                        <CheckCircle2 size={13} /> ¡10% de descuento aplicado!
                      </p>
                    )}
                  </form>

                  {/* Precios */}
                  <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartItems.length} rubros)</span>
                      <span className="font-semibold text-gray-900">{formatPrice(cartTotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-700 font-bold">
                        <span>Descuento Promocional</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span>Despacho Estimado</span>
                      <span className="font-semibold text-green-700">
                        {isFreeShipping ? 'GRATIS' : formatPrice(2.00)}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-base font-black text-gray-900">
                        <span>Subtotal Estimado</span>
                        <span className="text-green-700 text-xl">{formatPrice(grandTotal)}</span>
                      </div>
                      <div className="text-right text-[11px] text-gray-500 font-semibold mt-0.5">
                        Dual BCV: {formatPriceDual(grandTotal)}
                      </div>
                    </div>
                  </div>

                  {/* Botón para Avanzar al Paso 2 */}
                  <button
                    type="button"
                    onClick={handleGoToStep2}
                    style={{ backgroundColor: '#58A618' }}
                    className="w-full hover:bg-green-600 text-white font-bold text-xs md:text-sm py-4 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Continuar a Datos de Entrega</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>

                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* PASO 2: EXCLUSIVO DATOS DE ENTREGA Y MÉTODO DE PAGO */}
            {/* ========================================================================= */}
            {currentStep === 2 && (
              <form onSubmit={handleGoToStep3} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
                
                {/* Formulario de Datos (Columna Izquierda 2 Cols) */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                        <MapPin className="text-green-600" size={20} />
                        <span>2. Ingresa tus Datos de Entrega y Pago</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Proporciona tus datos para el envío express en Barinas
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-green-700 font-bold hover:underline"
                    >
                      ← Editar Productos
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Nombre Completo */}
                    <div>
                      <label className="block font-bold text-gray-700 mb-1.5">Nombre Completo *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 text-gray-400" size={16} />
                        <input
                          type="text"
                          required
                          placeholder="Ej. María Pérez"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-xs focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block font-bold text-gray-700 mb-1.5">Teléfono de Contacto</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 text-gray-400" size={16} />
                        <input
                          type="tel"
                          placeholder="Ej. 0414-1234567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-xs focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Dirección Exacta */}
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-700 mb-1.5">Dirección Exacta de Entrega (Barinas)</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 text-gray-400" size={16} />
                        <textarea
                          rows={2}
                          placeholder="Ej. Urb. Alto Barinas Norte, Calle principal, Casa #45"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-xs focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all resize-none font-medium"
                        />
                      </div>
                    </div>

                    {/* Notas Adicionales */}
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-700 mb-1.5">Instrucciones Especiales (Opcional)</label>
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-3 text-gray-400" size={16} />
                        <input
                          type="text"
                          placeholder="Ej. Por favor picar la carne en bistec delgado"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-xs focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Selección de Métodos de Pago */}
                  <div className="pt-4 border-t border-gray-100">
                    <label className="block font-extrabold text-gray-900 text-xs mb-3 uppercase tracking-wider">
                      Selecciona tu Método de Pago Preferido
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PAYMENT_OPTIONS.map((method) => {
                        const isSelected = formData.paymentMethod === method.id;
                        const IconComp = method.icon;

                        return (
                          <div
                            key={method.id}
                            onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                            className={`cursor-pointer rounded-2xl p-3.5 border-2 transition-all flex items-center justify-between ${
                              isSelected
                                ? 'border-green-600 bg-green-50/60 shadow-xs'
                                : 'border-gray-200 bg-gray-50/50 hover:border-green-300 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
                                <IconComp size={18} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-xs font-bold text-gray-900">{method.title}</h4>
                                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white border border-gray-200 text-green-700">
                                    {method.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-gray-500">{method.desc}</p>
                              </div>
                            </div>

                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 bg-white'
                            }`}>
                              {isSelected && <Check size={12} strokeWidth={3} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Resumen Lateral del Paso 2 */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6">
                  <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                    Resumen de Envío
                  </h2>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Total Productos ({cartItems.length})</span>
                      <span className="font-semibold text-gray-900">{formatPrice(cartTotal)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Despacho en Barinas</span>
                      <span className="font-semibold text-green-700">
                        {isFreeShipping ? 'GRATIS' : formatPrice(2.00)}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-base font-black text-gray-900">
                        <span>Total a Pagar</span>
                        <span className="text-green-700 text-2xl">{formatPrice(grandTotal)}</span>
                      </div>
                      <div className="text-right text-[11px] text-gray-500 font-semibold mt-0.5">
                        Dual BCV: {formatPriceDual(grandTotal)}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: '#58A618' }}
                    className="w-full hover:bg-green-600 text-white font-bold text-xs md:text-sm py-4 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Continuar a Confirmación Final</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-full text-center text-xs text-gray-500 font-bold hover:text-green-700 py-1"
                  >
                    ← Volver a Selección de Productos
                  </button>
                </div>

              </form>
            )}

            {/* ========================================================================= */}
            {/* PASO 3: EXCLUSIVO CONFIRMACIÓN FINAL Y ENVÍO A WHATSAPP */}
            {/* ========================================================================= */}
            {currentStep === 3 && (
              <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
                
                {/* Tarjeta Ejecutiva de Confirmación */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl space-y-6">
                  <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                        Paso 3 de 3 - Confirmación
                      </span>
                      <h2 className="text-xl font-extrabold text-gray-900 mt-2">
                        Resumen Final de tu Pedido
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-green-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <Edit2 size={13} /> Editar Datos
                    </button>
                  </div>

                  {/* Resumen de Datos del Cliente */}
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400 font-bold block text-[10px]">CLIENTE:</span>
                      <span className="font-extrabold text-gray-900">{formData.name}</span>
                      {formData.phone && <span className="block text-gray-500">{formData.phone}</span>}
                    </div>

                    <div>
                      <span className="text-gray-400 font-bold block text-[10px]">DIRECCIÓN DE ENTREGA:</span>
                      <span className="font-semibold text-gray-800">{formData.address}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 font-bold block text-[10px]">MÉTODO DE PAGO:</span>
                      <span className="font-bold text-green-700">{formData.paymentMethod}</span>
                    </div>

                    {formData.notes && (
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px]">NOTAS ADICIONALES:</span>
                        <span className="font-medium text-gray-700">{formData.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Lista Resumida de Ítems */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">
                      Detalle de Productos ({cartItems.length})
                    </h4>
                    <div className="divide-y divide-gray-100 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      {cartItems.map(item => (
                        <div key={item.id} className="py-2 flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-green-700">{item.quantity}x</span>
                            <span className="font-semibold text-gray-800">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-gray-900 block">{formatPrice(item.price * item.quantity)}</span>
                            <span className="text-[10px] text-gray-400 font-medium block">{formatPriceDual(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desglose de Pago Final */}
                  <div className="bg-green-50 p-4 rounded-2xl border border-green-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-green-800 font-bold block text-[10px] uppercase">TOTAL FINAL A PAGAR:</span>
                      <span className="text-2xl font-black text-green-800 block">{formatPrice(grandTotal)}</span>
                      <span className="text-xs font-semibold text-green-700 block">Equivalente Dual: {formatPriceDual(grandTotal)}</span>
                    </div>
                    <span className="bg-white text-green-800 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-2xs border border-green-300">
                      Despacho Express Incluido
                    </span>
                  </div>

                  {/* Botón Principal de Envío Directo a WhatsApp */}
                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    style={{ backgroundColor: '#25D366' }}
                    className="w-full hover:brightness-105 text-white font-bold text-sm md:text-base py-4 px-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group"
                  >
                    <MessageCircle size={22} className="transition-transform group-hover:scale-110" />
                    <span>Confirmar y Enviar Pedido por WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 text-center">
                    <ShieldCheck size={16} className="text-green-600" />
                    <span>Tu orden se procesará de forma inmediata con nuestro equipo en Barinas</span>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-gray-500 font-bold hover:text-green-700 underline"
                  >
                    ← Cambiar Datos de Entrega o Método de Pago
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
