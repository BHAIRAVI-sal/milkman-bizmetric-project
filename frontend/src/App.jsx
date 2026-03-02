import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import ProductSection from "./components/ProductSection";

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <CategorySection />
      <ProductSection />
    </div>
  );
}