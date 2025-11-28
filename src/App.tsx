import { Routes, Route } from 'react-router-dom';
import { ProductsPage } from './pages/ProductPage';
import { ProductDetailPage } from './pages/productDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default App;
