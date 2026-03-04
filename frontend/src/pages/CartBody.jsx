import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../store/cart.jsx";

export default function CartBody() {
  const { cart = [], add, remove } = useCart();

  if (!cart.length)
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="p-4 text-center text-gray-500">Your cart is empty</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="p-4 max-w-3xl mx-auto space-y-4">
        {cart.map((item) => (
          <div key={`${item.id}-${item.qtyLabel}-${item.plan}`} className="flex items-center justify-between border p-3 rounded shadow-sm">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1 px-4">
              <h2 className="font-bold">{item.name}</h2>
              <p>Price: ₹{item.price}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => add(item, item.qtyLabel, item.price, item.plan, -1)}
                  className="px-2 bg-gray-200 rounded"
                  disabled={item.count <= 1}
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  onClick={() => add(item, item.qtyLabel, item.price, item.plan, 1)}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => remove(item.id, item.qtyLabel, item.plan)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">Total: ₹{cart.reduce((sum, i) => sum + i.price * i.count, 0)}</div>
          <Link
            to="/checkout"
            className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}