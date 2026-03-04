import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./store/cart.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import CategorySection from "./components/CategorySection.jsx";
import ProductSection from "./components/ProductSection.jsx";
import CartBody from "./pages/CartBody.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Hero />
                <CategorySection />
                <ProductSection />
              </div>
            }
          />
          <Route path="/cart" element={<CartBody />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<div className="text-center p-10 text-gray-500">Page not found</div>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}