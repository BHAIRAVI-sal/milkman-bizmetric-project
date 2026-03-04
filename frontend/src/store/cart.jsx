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

  const remove = (id, qtyLabel, plan) =>
    setCart((prev) =>
      prev.filter((i) => !(i.id === id && i.qtyLabel === qtyLabel && i.plan === plan))
    );

  const clear = () => setCart([]);

  const items = cart.map((i) => ({
    key: `${i.id}-${i.qtyLabel}-${i.plan}`,
    product: { id: i.id, name: i.name, imageUrl: i.imageUrl },
    quantityLabel: i.qtyLabel,
    plan: i.plan,
    price: i.price,
    count: i.count,
  }));

  const total = cart.reduce((sum, i) => sum + Number(i.price) * Number(i.count), 0);

  return (
    <CartContext.Provider value={{ cart, items, total, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return (
    useContext(CartContext) || {
      cart: [],
      items: [],
      total: 0,
      add: () => {},
      remove: () => {},
      clear: () => {},
    }
  );
}