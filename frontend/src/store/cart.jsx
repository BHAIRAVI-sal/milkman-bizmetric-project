 import { createContext, useContext, useEffect, useMemo, useState } from "react";
 
 const CartContext = createContext(null);
 
 export function CartProvider({ children }) {
   const [items, setItems] = useState(() => {
     try {
       const raw = localStorage.getItem("cart_v1");
       return raw ? JSON.parse(raw) : [];
     } catch {
       return [];
     }
   });
 
   useEffect(() => {
     localStorage.setItem("cart_v1", JSON.stringify(items));
   }, [items]);
 
   const add = (product, quantityLabel, price, plan = "one-time", count = 1) => {
     setItems((prev) => {
       const key = `${product.id}_${quantityLabel}_${plan}`;
       const idx = prev.findIndex((i) => i.key === key);
       if (idx >= 0) {
         const next = [...prev];
         next[idx] = { ...next[idx], count: next[idx].count + count };
         return next;
       }
       return [
         ...prev,
         {
           key,
           product: { id: product.id, name: product.name, imageUrl: product.imageUrl },
           quantityLabel,
           price: Number(price),
           plan,
           count,
         },
       ];
     });
   };
 
   const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
   const clear = () => setItems([]);
 
   const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.count, 0), [items]);
 
   const value = { items, add, remove, clear, total };
   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
 }
 
 export function useCart() {
   const ctx = useContext(CartContext);
   if (!ctx) throw new Error("useCart must be used within CartProvider");
   return ctx;
 }
