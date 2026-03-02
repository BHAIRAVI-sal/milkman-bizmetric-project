import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../lib/api";
import { getCategoryImage } from "../images/js/imagemap";
import productImageMap from "../assets/productImageMap";

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((data) => {
        if (!mounted) return;
        const mapped = data.map((p) => {
          const prices =
            Array.isArray(p.quantities) && p.quantities.length
              ? p.quantities
                  .map((q) => Number(q.price))
                  .filter((n) => !Number.isNaN(n))
              : [];
          const min = prices.length ? Math.min(...prices) : 0;
          return {
            id: p.id,
            name: p.name,
            imageUrl:
              productImageMap[p.name] ||
              (p.image ? `http://localhost:8000${p.image}` : null) ||
              getCategoryImage(p.category?.name || "Milk"),
            displayPrice: min ? `from ${min}` : "N/A",
            minPrice: min,
          };
        });
        setProducts(mapped);
      })
      .catch(() => {
        if (!mounted) return;
        setProducts([
          {
            id: 1,
            name: "Farm Fresh Cow Milk",
            imageUrl: getCategoryImage("Milk"),
            displayPrice: "from 60",
          },
          {
            id: 2,
            name: "Soft Malai Paneer",
            imageUrl: productImageMap["Soft Malai Paneer"] || getCategoryImage("Paneer"),
            displayPrice: "from 180",
          },
          {
            id: 3,
            name: "Cultured Butter",
            imageUrl: productImageMap["Cultured Butter"] || getCategoryImage("Butter"),
            displayPrice: "from 150",
          },
          {
            id: 4,
            name: "Aged Cheese",
            imageUrl: productImageMap["Aged Cheese"] || getCategoryImage("Cheese"),
            displayPrice: "from 220",
          },
        ]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="px-10 py-14 bg-white">
      <h2 className="text-4xl font-extrabold mb-10 text-center">
        Best Sellers 🏆
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((p) => (
          <ProductCard key={p.id || p.name} product={p} />
        ))}
      </div>
    </section>
  );
}
