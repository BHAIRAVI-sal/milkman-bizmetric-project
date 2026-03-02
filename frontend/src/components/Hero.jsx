import React from "react";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Fresh Dairy Delivered <br /> In Minutes 🥛
        </h1>

        <p className="text-lg md:text-xl mb-8 opacity-90">
          Milk • Curd • Butter • Ghee • Paneer • Lassi • Yogurt <br />
          Farm fresh dairy products straight to your doorstep.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-green-500 hover:bg-green-600 transition text-white px-8 py-3 rounded-lg font-semibold shadow-lg">
            Shop Now
          </button>

          <button className="bg-white text-green-600 hover:bg-gray-100 transition px-8 py-3 rounded-lg font-semibold shadow-lg">
            View Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;