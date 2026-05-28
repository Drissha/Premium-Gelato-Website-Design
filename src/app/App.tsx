import { BrowserRouter, Routes, Route } from 'react-router';
import { GelatoNavbar } from './components/GelatoNavbar';
import { ScrollToTop } from './components/ScrollToTop';
import  HomePage  from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { LocationsPage } from './pages/LocationsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-pink-50/30 to-purple-50/30">
        <GelatoNavbar />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/locations" element={<LocationsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
