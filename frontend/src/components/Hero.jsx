import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HERO_IMAGE_URL = "/images/home-bg.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 py-10 text-center">
      <div className="max-w-6xl mx-auto px-6">
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Velvet Milk Dairy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base text-gray-700 mb-4"
        >
          Fresh milk and dairy delivered daily — pure, healthy, reliable.
        </motion.p>

        <div className="mb-4">
          <img
            src={HERO_IMAGE_URL}
            alt="Fresh dairy"
            className="mx-auto w-[96%] max-h-[300px] object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <motion.button
          onClick={() => navigate("/products")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow transition"
        >
          Start Shopping
        </motion.button>

      </div>
    </section>
  );
}