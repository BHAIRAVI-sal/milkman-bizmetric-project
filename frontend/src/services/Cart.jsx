import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const add = (product, qtyLabel, price, plan, count) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.qtyLabel === qtyLabel && i.plan === plan
      );
      if (existing) {
        const newCount = existing.count + count;
        if (newCount <= 0) return prev.filter((i) => i !== existing);
        return prev.map((i) => (i === existing ? { ...i, count: newCount } : i));
      }
      return [
        ...prev,
        { id: product.id, name: product.name, imageUrl: product.imageUrl, qtyLabel, plan, price, count },
      ];
    });
  };

  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  return <CartContext.Provider value={{ cart, add, remove }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext) || { cart: [], add: () => {}, remove: () => {} };
}