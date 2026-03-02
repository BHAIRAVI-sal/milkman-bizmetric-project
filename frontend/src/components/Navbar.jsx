import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-pink-600">🥛 Velvet Milk Dairy</Link>

      <div className="flex gap-6 text-gray-600 font-medium">
        <Link to="/" className="hover:text-pink-600">Home</Link>
        <Link to="/products" className="hover:text-pink-600">Products</Link>
        <Link to="/cart" className="hover:text-pink-600">Cart</Link>
        <Link to="/dashboard" className="hover:text-pink-600">Dashboard</Link>
      </div>

      <Link to="/delivery" className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700">
        Delivery Panel
      </Link>
    </nav>
  );
}
