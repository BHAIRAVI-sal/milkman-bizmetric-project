import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Milk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpOlbgtRoy_UbhC1BRcEfPd3a9oPiRYphl1A&s" },
  { name: "Curd & Yogurt", image: "https://img.pikbest.com/origin/09/23/70/16hpIkbEsTdPp.png!sw800" },
  { name: "Lassi", image: "https://png.pngtree.com/png-vector/20251219/ourlarge/pngtree-sweet-lassi-indian-beverage-illustration-png-image_18228192.webp" },
  { name: "Paneer", image: "https://img.freepik.com/premium-vector/paneer-dairy-food-vector-artwork-design_1080480-97388.jpg" },
  { name: "Butter", image: "https://png.pngtree.com/png-clipart/20220913/original/pngtree-cute-butter-cartoon-png-image_8616547.png" },
  { name: "Cheese", image: "https://i.fbcd.co/products/resized/resized-750-500/cheese-to-meet-you-pun-logo-slogan-illustration-png-cartoon-36e7a3d0b26668cba52e0c5bbfc4d6c53237610c6b4436e588ce0fd9440c47f8.jpg" },
  { name: "Ghee", image: "https://thumbs.dreamstime.com/b/desi-ghee-pot-illustration-indian-traditional-cow-butter-milk-mud-healthy-134355795.jpg" },
  { name: "Buttermilk", image: "https://png.pngtree.com/png-vector/20250612/ourmid/pngtree-buttermilk-in-glass-with-spices-on-top-isolated-transparent-background-png-image_16526160.png" },
  { name: "Cream", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMm2fqL5GcfdIVbbcCTjSOiTf9g08WjlpNJA&s" },
];

export default function CategorySection() {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate("/shop-by-category");
  };

  return (
    <section className="px-6 md:px-12 py-16 bg-gray-50">
      
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-12">
        Shop by Category 🧀
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative h-60 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
            onClick={handleCategoryClick}
          >
            
            {/* Background Image */}
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

            {/* Category Name */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg font-semibold tracking-wide">
              {category.name}
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}