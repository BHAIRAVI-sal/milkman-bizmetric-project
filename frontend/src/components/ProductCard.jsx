import { useCart } from "../store/cart.jsx";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const handleAdd = () => {
    const price = Number(product.minPrice || 0);
    const name = (product.name || "").toLowerCase();
    const isWeight = /(paneer|butter|cheese|ghee|cream)/.test(name);
    const qtyLabel = isWeight ? "500g" : "500ml";
    add({ id: product.id, name: product.name, imageUrl: product.imageUrl }, qtyLabel, price, "one-time", 1);
  };
  return (
    <div className="rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden bg-white">
      <div className="h-56 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover hover:scale-110 transition-all duration-300"
          onError={(e) => {
            e.currentTarget.src = "/visuals/cow-milk-user.png";
          }}
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-600 mt-1">₹ {product.displayPrice}</p>

        <button onClick={handleAdd} className="mt-4 w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition">
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}
