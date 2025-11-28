import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ErrorMessage } from '../components/ErrorMessage';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoaderSpinner';
import { useProducts } from '../hooks/useProduct';

export const ProductsPage = () => {
  const navigate = useNavigate();
  const { products, loading, error, retry } = useProducts();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header productCount={products.length} />

      <main className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} onRetry={retry} />}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Product Store - Your one-stop shop for amazing products
          </p>
        </div>
      </footer>
    </div>
  );
};
