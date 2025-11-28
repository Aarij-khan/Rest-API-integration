import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProductDetail } from '../hooks/useProductDetail';
import { ErrorMessage } from '../components/ErrorMessage';
import { ArrowLeft, Star, Package, Shield, Heart, ShoppingCart, CheckCircle, Zap, Award, RotateCcw } from 'lucide-react';
import { LoadingSpinner } from '../components/LoaderSpinner';

export const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { product, loading, error, retry } = useProductDetail(productId || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;
  if (!product) return <ErrorMessage message="Product not found" onRetry={retry} />;

  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const savings = (product.price * product.discountPercentage / 100).toFixed(2);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium hover:bg-gray-50 px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={product.images?.[selectedImage] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-6 right-6 bg-gradient-to-br from-red-500 to-red-700 text-white px-5 py-3 rounded-full font-bold text-xl shadow-xl">
                    -{product.discountPercentage.toFixed(0)}%
                  </div>
                )}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-6 left-6 bg-white/90 backdrop-blur rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 hover:bg-white"
                >
                  <Heart
                    className={`w-7 h-7 transition-all duration-300 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 hover:shadow-lg ${
                        selectedImage === index
                          ? 'border-blue-600 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-blue-200">
                  {product.category}
                </span>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">{product.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-600">(4.2k reviews)</span>
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {product.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                {product.description}
              </p>

              <div className="flex items-center gap-3 pb-8 border-b border-gray-200">
                <span className="text-sm text-gray-500">Brand:</span>
                <span className="text-lg font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-full">
                  {product.brand}
                </span>
              </div>
            </div>

            <div className="space-y-8 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-10 border border-blue-200">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-3 uppercase tracking-wider">Price</p>
                <div className="flex items-baseline gap-6">
                  <span className="text-6xl font-black text-gray-900">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <div className="space-y-2">
                      <span className="block text-2xl text-gray-500 line-through font-medium">
                        ${product.price.toFixed(2)}
                      </span>
                      <p className="text-green-600 font-bold text-lg">
                        Save ${savings}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-semibold">Quantity</span>
                  <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-lg font-bold text-xl text-gray-700"
                    >
                      −
                    </button>
                    <span className="w-14 text-center font-bold text-xl text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-lg font-bold text-xl text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={`flex items-center gap-2 font-bold text-lg px-4 py-3 rounded-xl ${
                  product.stock > 20
                    ? 'text-green-700 bg-green-100/50'
                    : product.stock > 0
                    ? 'text-orange-700 bg-orange-100/50'
                    : 'text-red-700 bg-red-100/50'
                }`}>
                  <Package className="w-5 h-5" />
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : product.stock > 0
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-2xl hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Added to Cart!
                  </>
                ) : product.stock > 0 ? (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </>
                ) : (
                  'Out of Stock'
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-8 text-center">
                <Zap className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <p className="font-bold text-gray-900 mb-2 text-lg">Fast Delivery</p>
                <p className="text-gray-700 font-medium">Ships within 24-48 hours</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-8 text-center">
                <Shield className="w-10 h-10 text-green-600 mx-auto mb-4" />
                <p className="font-bold text-gray-900 mb-2 text-lg">Secure Payment</p>
                <p className="text-gray-700 font-medium">100% safe transactions</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 text-center">
                <RotateCcw className="w-10 h-10 text-amber-600 mx-auto mb-4" />
                <p className="font-bold text-gray-900 mb-2 text-lg">Easy Returns</p>
                <p className="text-gray-700 font-medium">30-day return policy</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border border-orange-200 rounded-2xl p-10">
              <div className="flex gap-5">
                <Award className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-2 text-lg">Premium Quality Guaranteed</p>
                  <p className="text-gray-700 leading-relaxed">
                    This highly-rated product ({product.rating}/5 stars) has been carefully selected and verified. Trusted by thousands of satisfied customers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-24">
        <div className="max-w-[1600px] mx-auto px-6 py-12">
          <p className="text-center text-gray-300 font-medium">
            Premium Product Store - Your trusted source for quality products
          </p>
        </div>
      </footer>
    </div>
  );
};
