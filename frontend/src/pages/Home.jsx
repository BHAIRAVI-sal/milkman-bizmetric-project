import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import { motion } from "framer-motion";

const BANNER_IMAGE_URL = "/images/farm-banner.png";
const PROMO_COW_IMAGE_URL = "/visuals/cow-milk-poster.png";
const PROMO_PANEER_IMAGE_URL = "/visuals/paneer.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-white">

      {/* Navbar */}
      <Navbar />

      {/* ================= Banner Section ================= */}
      {/* <section className="w-full bg-white">
        <div className="w-full h-[380px] overflow-hidden">
          <img
            src={BANNER_IMAGE_URL}
            alt="Farm Fresh Milk Banner"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </section> */}

      {/* ================= Hero Section ================= */}
      <Hero />

      {/* ================= Promotional Images ================= */}
      {/* <section className="px-6 md:px-10 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={PROMO_COW_IMAGE_URL}
            alt="Cow Milk"
            className="rounded-xl shadow-lg w-full h-72 object-contain bg-white p-4"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "/visuals/cow-milk-user.png";
            }}
          />
          <img
            src={PROMO_PANEER_IMAGE_URL}
            alt="Paneer"
            className="rounded-xl shadow-lg w-full h-72 object-contain bg-white p-4"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "/visuals/cow-milk-user.png";
            }}
          />
        </div>
      </section> */}

      {/* ================= Categories ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <CategorySection />
      </motion.div>

      {/* ================= Products ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ProductSection />
      </motion.div>

    </div>
  );
}