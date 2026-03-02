import { useEffect, useState } from "react";
import { getCategories } from "../lib/api";
import { getCategoryImage } from "../images/js/imagemap";

export default function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;
    getCategories()
      .then((data) => {
        if (mounted) setCategories(data);
      })
      .catch(() => {
        if (mounted)
          setCategories([
            { id: 1, name: "Milk" },
            { id: 2, name: "Paneer" },
            { id: 3, name: "Butter" },
            { id: 4, name: "Cheese" },
            { id: 5, name: "Curd & Yogurt" },
          ]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="px-10 py-14 bg-gradient-to-b from-white to-pink-50">
      <h2 className="text-4xl font-extrabold mb-10 text-center">
        Shop by Category 🧀
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id || cat.name}
            className="group rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-48">
              <img
                src={getCategoryImage(cat.name)}
                alt={cat.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/visuals/cow-milk-user.png";
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />
              <div className="absolute bottom-4 w-full text-center text-white font-bold text-xl">
                {cat.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
