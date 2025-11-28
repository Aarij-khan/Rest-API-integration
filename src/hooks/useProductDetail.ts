import { useState, useEffect } from 'react';
import type { Product } from '../types/product';

interface UseProductDetailResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export const useProductDetail = (productId: string): UseProductDetailResult => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!productId) {
      setError('Invalid product ID');
      setLoading(false);
      return;
    }

    const fetchProductDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/products/${productId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch product details';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId, retryCount]);

  const retry = () => {
    setRetryCount(prev => prev + 1);
  };

  return { product, loading, error, retry };
};
