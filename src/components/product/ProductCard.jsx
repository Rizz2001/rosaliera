import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ShareButton } from '../common/ShareButton';
import { formatCurrency } from '../../utils/formatCurrency';

export function ProductCard({ product }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find(item => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Badges de Oferta y Frescura */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.isOffer && (
          <span style={{ backgroundColor: '#E53935' }} className="text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm">
            Oferta Especial
          </span>
        )}
        {product.isFresh && (
          <span style={{ backgroundColor: '#58A618' }} className="text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm">
            Fresco del Día
          </span>
        )}
      </div>

      {/* Imagen del Producto con enlace al detalle /producto/:id */}
      <Link to={`/producto/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/90 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye size={14} /> Ver Detalle
          </span>
        </div>
      </Link>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-semibold text-green-700">{product.categoryName}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star size={12} className="fill-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link to={`/producto/${product.id}`}>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 mb-1.5 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-gray-500 line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        <div>
          {/* Precio y Unidad */}
          <div className="flex items-baseline justify-between mb-3 pt-2 border-t border-gray-50">
            <div>
              <span className="text-lg font-extrabold text-gray-900">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-gray-500 font-medium"> / {product.unit}</span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Botones de Acción Estilo Farmatodo (Controlador de Cantidad Integrado) */}
          <div className="flex items-center gap-2">
            {currentQuantity === 0 ? (
              <button
                onClick={() => addToCart(product, 1)}
                style={{ backgroundColor: '#58A618' }}
                className="flex-1 hover:bg-green-600 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 group/btn"
              >
                <ShoppingCart size={15} />
                <span>Agregar</span>
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-between border-2 border-green-600 rounded-xl bg-green-50/50 p-0.5">
                <button
                  onClick={() => updateQuantity(product.id, currentQuantity - 1)}
                  className="w-7 h-7 flex items-center justify-center bg-white hover:bg-green-100 text-green-700 font-bold rounded-lg shadow-2xs transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="text-xs font-extrabold text-green-800 px-2">{currentQuantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, currentQuantity + 1)}
                  className="w-7 h-7 flex items-center justify-center bg-white hover:bg-green-100 text-green-700 font-bold rounded-lg shadow-2xs transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            )}

            <ShareButton
              title={product.name}
              text={`¡Mira este producto fresco en Alimentos La Rosaliera: ${product.name}!`}
              url={`${window.location.origin}/producto/${product.id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
