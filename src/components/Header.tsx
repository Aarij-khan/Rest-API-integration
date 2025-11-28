import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  productCount: number;
}

export const Header = ({ productCount }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Product Store</h1>
              <p className="text-xs text-gray-500">Discover amazing products</p>
            </div>
          </div>
          {productCount > 0 && (
            <div className="bg-blue-50 px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-blue-700">
                {productCount} Products
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
