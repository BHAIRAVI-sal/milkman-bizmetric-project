import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { hero as defaultHero } from "../images/js/imagemap";
 
 export default function Splash() {
  const [img, setImg] = useState("/splash.png");
  useEffect(() => {
    const test = new Image();
    test.onload = () => setImg("/splash.png");
    test.onerror = () => setImg(defaultHero);
    test.src = "/splash.png";
  }, []);
   return (
     <div className="min-h-screen relative">
       <div
         className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
       />
       <div className="absolute inset-0 bg-black/40" />
       <div className="relative z-10 h-screen flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-5xl font-extrabold">Velvet Milk Dairy</h1>
         <p className="mt-3 text-lg text-gray-200">
           Fresh milk and dairy delivered daily — fast, reliable, delightful.
         </p>
         <Link
           to="/products"
           className="mt-8 px-8 py-4 rounded-2xl bg-pink-600 hover:bg-pink-700"
         >
           Start Shopping
         </Link>
       </div>
     </div>
   );
 }
