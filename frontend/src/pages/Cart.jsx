 import Navbar from "../components/Navbar";
import { CartProvider, useCart } from "../store/cart.jsx";
 
 function CartBody() {
   const { items, remove, total } = useCart();
   return (
     <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
       <Navbar />
       <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
         <h1 className="text-3xl font-extrabold mb-6">Your Cart</h1>
         {items.length === 0 ? (
           <div className="text-gray-500">Cart is empty.</div>
         ) : (
           <div className="space-y-4">
             {items.map((i) => (
               <div key={i.key} className="flex items-center justify-between p-4 bg-white rounded-xl shadow">
                 <div className="flex items-center gap-4">
                   <img src={i.product.imageUrl} alt={i.product.name} className="w-20 h-20 object-cover rounded-lg" />
                   <div>
                     <div className="font-semibold">{i.product.name}</div>
                     <div className="text-sm text-gray-600">
                       {i.quantityLabel} • {i.plan} • x{i.count}
                     </div>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="font-bold">₹ {i.price * i.count}</div>
                   <button onClick={() => remove(i.key)} className="text-red-600 hover:underline">Remove</button>
                 </div>
               </div>
             ))}
 
             <div className="flex justify-between items-center text-xl font-bold pt-4">
               <div>Total</div>
               <div>₹ {total}</div>
             </div>
 
             <div className="text-right">
               <a href="/checkout" className="inline-block px-6 py-3 rounded-xl bg-pink-600 text-white hover:bg-pink-700">
                 Proceed to Checkout
               </a>
             </div>
           </div>
         )}
       </div>
     </div>
   );
 }
 
 export default function Cart() {
   return (
     <CartProvider>
       <CartBody />
     </CartProvider>
   );
 }
