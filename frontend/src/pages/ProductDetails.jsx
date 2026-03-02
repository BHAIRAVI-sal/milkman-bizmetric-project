 import { useEffect, useMemo, useState } from "react";
 import { useParams } from "react-router-dom";
 import Navbar from "../components/Navbar";
 import { getProducts } from "../lib/api";
import { getCategoryImage } from "../images/js/imagemap";
import { CartProvider, useCart } from "../store/cart.jsx";
 
 function DetailsBody() {
   const { id } = useParams();
   const { add } = useCart();
   const [product, setProduct] = useState(null);
   const [quantity, setQuantity] = useState("");
   const [plan, setPlan] = useState("one-time");
 
   useEffect(() => {
     let mounted = true;
     getProducts()
       .then((data) => {
         if (!mounted) return;
         const p = data.find((x) => String(x.id) === String(id));
         if (!p) return;
         const prices =
           Array.isArray(p.quantities) && p.quantities.length
             ? p.quantities.map((q) => ({ label: q.label, price: Number(q.price) }))
             : [];
         setProduct({
           id: p.id,
           name: p.name,
           description: p.description,
           category: p.category?.name || "Milk",
           milkType: p.milk_type?.name || "General",
           imageUrl: getCategoryImage(p.category?.name || "Milk"),
           prices,
         });
         if (prices[0]) setQuantity(prices[0].label);
       })
       .catch(() => {});
     return () => {
       mounted = false;
     };
   }, [id]);
 
   const price = useMemo(() => {
     if (!product) return 0;
     const entry = product.prices.find((p) => p.label === quantity);
     if (!entry) return 0;
     let base = entry.price;
     if (plan === "daily") base = base * 30;
     if (plan === "monthly") base = Math.round(base * 30 * 0.9);
     return base;
   }, [product, quantity, plan]);
 
   if (!product) {
     return <div className="py-20 text-center text-gray-500">Loading…</div>;
   }
 
   return (
     <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
       <Navbar />
       <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="rounded-3xl overflow-hidden shadow-2xl">
           <img src={product.imageUrl} alt={product.name} className="w-full h-[420px] object-cover" />
         </div>
         <div className="space-y-5">
           <h1 className="text-3xl font-extrabold">{product.name}</h1>
           <p className="text-gray-600">{product.description || "Pure, fresh, and farm-direct."}</p>
           <div className="flex gap-2 text-sm">
             <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700">{product.category}</span>
             <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">{product.milkType}</span>
           </div>
 
           <div className="pt-4">
             <label className="block text-sm font-semibold mb-2">Quantity</label>
             <div className="flex flex-wrap gap-2">
               {product.prices.map((q) => (
                 <button
                   key={q.label}
                   onClick={() => setQuantity(q.label)}
                   className={`px-4 py-2 rounded-full border ${
                     q.label === quantity ? "bg-pink-600 text-white border-pink-600" : "bg-white"
                   }`}
                 >
                   {q.label} — ₹{q.price}
                 </button>
               ))}
             </div>
           </div>
 
           <div>
             <label className="block text-sm font-semibold mb-2">Plan</label>
             <div className="flex flex-wrap gap-2">
               {["one-time", "daily", "monthly"].map((p) => (
                 <button
                   key={p}
                   onClick={() => setPlan(p)}
                   className={`px-4 py-2 rounded-full border ${
                     p === plan ? "bg-pink-600 text-white border-pink-600" : "bg-white"
                   }`}
                 >
                   {p === "one-time" ? "One-time" : p.charAt(0).toUpperCase() + p.slice(1)}
                 </button>
               ))}
             </div>
           </div>
 
           <div className="text-3xl font-extrabold">₹ {price}</div>
 
           <div className="flex gap-3">
             <button
               onClick={() => add(product, quantity, price, plan, 1)}
               className="px-6 py-3 rounded-xl bg-pink-600 text-white hover:bg-pink-700"
             >
               Add to Cart
             </button>
             <a href="/cart" className="px-6 py-3 rounded-xl border">Go to Cart</a>
           </div>
         </div>
       </div>
     </div>
   );
 }
 
 export default function ProductDetails() {
   return (
     <CartProvider>
       <DetailsBody />
     </CartProvider>
   );
 }
