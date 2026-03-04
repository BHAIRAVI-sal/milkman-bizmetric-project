import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/api";
import productImageMap from "../assets/productImageMap";
import { getCategoryImage } from "../images/js/imagemap";

export default function ShopByCategory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((data) => {
        if (!mounted) return;
        const mapped = data.map((p) => {
          const prices =
            Array.isArray(p.quantities) && p.quantities.length
              ? p.quantities.map((q) => Number(q.price)).filter((n) => !Number.isNaN(n))
              : [];
          const min = prices.length ? Math.min(...prices) : 0;
          const backendImage = p.image ? `http://localhost:8000${p.image}` : null;
          return {
            id: p.id,
            name: p.name,
            category: p.category?.name || "Milk",
            milkType: p.milk_type?.name || "General",
            imageUrl:
              productImageMap[p.name] ||
              backendImage ||
              getCategoryImage(p.category?.name || "Milk"),
            displayPrice: min ? `from ${min}` : "N/A",
            minPrice: min,
          };
        });
        setProducts(mapped);
      })
      .catch(() => setProducts([]))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const groupedByCategory = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <h1 className="text-3xl font-extrabold text-pink-600 mb-6">Shop by Category</h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading categories...</div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedByCategory).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {items.map((p) => (
                    <Link key={p.id} to={`/products/${p.id}`}>
                      <ProductCard product={p} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
