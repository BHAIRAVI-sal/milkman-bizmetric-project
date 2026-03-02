import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import { motion as MOTION } from "framer-motion";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <section className="px-6 md:px-10 py-10 bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <img src="/visuals/cow-milk-poster.png" alt="Cow Milk poster" className="rounded-2xl shadow-xl object-cover w-full h-64 md:h-72" />
          <img src="/visuals/paneer.png" alt="Paneer banner" className="rounded-2xl shadow-xl object-cover w-full h-64 md:h-72" />
        </div>
      </section>
      <MOTION.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <CategorySection />
      </MOTION.div>
      <MOTION.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <ProductSection />
      </MOTION.div>
    </div>
  );
}
