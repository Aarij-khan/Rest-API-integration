import { useState } from 'react';
import { Star, Package, Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const secondImage = product.images?.[1] || product.thumbnail;

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={isHovered && secondImage ? secondImage : product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
          loading="lazy"
        />

        {product.discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            SAVE {product.discountPercentage.toFixed(0)}%
          </div>
        )}

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
        >
          <Heart
            className={`w-6 h-6 transition-all duration-300 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pt-12 pb-4 px-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-white text-gray-900 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-gray-900">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 h-14 leading-7">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10 leading-5">
          {product.description}
        </p>

        <div className="mb-4">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-lg text-gray-400 line-through font-medium">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-400" />
            <span className={`font-bold text-sm ${
              product.stock > 20 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'
            }`}>
              {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-bold">{product.brand}</span>
        </div>
      </div>

      {!product.stock && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
          <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">Out of Stock</span>
        </div>
      )}
    </div>
  );
};
