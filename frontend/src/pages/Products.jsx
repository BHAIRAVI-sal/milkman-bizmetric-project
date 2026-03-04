import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
 import Navbar from "../components/Navbar";
 import ProductCard from "../components/ProductCard";
 import { getProducts } from "../lib/api";
import { getCategoryImage } from "../images/js/imagemap";
import productImageMap from "../assets/productImageMap";
 
 export default function Products() {
   const [all, setAll] = useState([]);
   const [category, setCategory] = useState("All");
   const [milkType, setMilkType] = useState("All");
   const [query, setQuery] = useState("");
 
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
            imageUrl: productImageMap[p.name] || backendImage || getCategoryImage(p.category?.name || "Milk"),
            displayPrice: min ? `from ${min}` : "N/A",
            minPrice: min,
           };
         });
         setAll(mapped);
       })
       .catch(() => setAll([]));
     return () => {
       mounted = false;
     };
   }, []);
 
   const categories = useMemo(() => ["All", ...new Set(all.map((p) => p.category))], [all]);
   const milkTypes = useMemo(() => ["All", ...new Set(all.map((p) => p.milkType))], [all]);
 
   const filtered = useMemo(() => {
     return all
       .filter((p) => (category === "All" ? true : p.category === category))
       .filter((p) => (milkType === "All" ? true : p.milkType === milkType))
       .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
   }, [all, category, milkType, query]);
 
   return (
     <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
       <Navbar />
       <header className="px-6 md:px-10 py-6 bg-white/80 backdrop-blur sticky top-0 z-10 shadow">
         <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
           <h1 className="text-2xl font-extrabold text-pink-600">All Dairy Products</h1>
           <div className="flex flex-wrap gap-3">
             <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 rounded-xl border">
               {categories.map((c) => (
                 <option key={c} value={c}>{c}</option>
               ))}
             </select>
             <select value={milkType} onChange={(e) => setMilkType(e.target.value)} className="px-4 py-2 rounded-xl border">
               {milkTypes.map((m) => (
                 <option key={m} value={m}>{m}</option>
               ))}
             </select>
             <input
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Search products…"
               className="px-4 py-2 rounded-xl border w-60"
             />
           </div>
         </div>
       </header>
 
       <main className="px-6 md:px-10 py-10">
         {filtered.length === 0 ? (
           <div className="text-center text-gray-500">No products found.</div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((p) => (
              <Link to={`/products/${p.id}`} key={p.id}>
                <ProductCard product={p} />
              </Link>
            ))}
           </div>
         )}
       </main>
     </div>
   );
 }
