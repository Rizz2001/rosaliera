import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Truck, MessageCircle } from 'lucide-react';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { ShareButton } from '../components/common/ShareButton';
import { formatWhatsAppMessage } from '../utils/formatWhatsAppMessage';

export function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { formatPrice, formatPriceDual, bcvRate } = useCurrency();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    productService.getProductByIdOrSlug(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-xs text-gray-500 font-medium">Cargando producto de La Rosaliera...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Producto no encontrado</h2>
        <p className="text-xs text-gray-500 mb-4">El producto que buscas no está disponible o cambió de enlace.</p>
        <Link to="/" className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-green-700 transition-colors">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  const handleDirectWhatsAppBuy = () => {
    const singleItemCart = [{ ...product, quantity }];
    const total = product.price * quantity;
    const url = formatWhatsAppMessage(singleItemCart, {}, total);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-8 pb-28">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Botón de Regreso */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-green-700 mb-4 md:mb-6 bg-white px-3.5 py-2 rounded-full border border-gray-200 shadow-2xs transition-all"
        >
          <ArrowLeft size={16} />
          <span>Volver al Catálogo</span>
        </Link>

        {/* Ficha Principal del Producto */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          
          {/* Galería de Imagen */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 aspect-square flex items-center justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isOffer && (
              <span style={{ backgroundColor: '#E53935' }} className="absolute top-3 left-3 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                Oferta Especial
              </span>
            )}
          </div>

          {/* Información y Compra */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                  {product.categoryName}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star size={14} className="fill-amber-400" />
                  <span>{product.rating} / 5.0</span>
                </div>
              </div>

              <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-2">
                {product.name}
              </h1>

              <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Especificaciones */}
              {product.specs && (
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 mb-4 grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-gray-400 capitalize block text-[10px]">{key}:</span>
                      <span className="font-semibold text-gray-800">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Precios con Conversor Dual */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl md:text-4xl font-black text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">/ {product.unit}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through ml-2">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="text-xs text-green-700 font-semibold mt-1 flex items-center gap-1">
                  <span>Equivalencia Dual BCV: {formatPriceDual(product.price)}</span>
                </div>
              </div>

              {/* Selector de Cantidad */}
              <div className="flex flex-wrap items-center gap-3 mb-6 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-700">Cantidad ({product.unit}):</span>
                <div className="flex items-center border border-gray-300 rounded-xl bg-white p-0.5 shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="ml-auto sm:ml-0 text-right">
                  <span className="text-xs text-green-700 font-extrabold block">
                    Total: {formatPrice(product.price * quantity)}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium block">
                    ({formatPriceDual(product.price * quantity)})
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones de Compra y Compartir */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => addToCart(product, quantity)}
                  style={{ backgroundColor: '#58A618' }}
                  className="flex-1 hover:bg-green-600 text-white font-bold text-xs md:text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <ShoppingCart size={17} />
                  <span>Añadir al Carrito</span>
                </button>

                <button
                  onClick={handleDirectWhatsAppBuy}
                  style={{ backgroundColor: '#25D366' }}
                  className="flex-1 hover:brightness-105 text-white font-bold text-xs md:text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <MessageCircle size={17} />
                  <span>Comprar por WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <ShareButton
                  title={product.name}
                  text={`¡Mira este producto fresco de Alimentos La Rosaliera: ${product.name}!`}
                  url={window.location.href}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-1.5 px-3 text-xs min-h-[36px]"
                />

                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-gray-500">
                  <Truck size={13} className="text-green-600 shrink-0" />
                  <span>Express Alto Barinas</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
