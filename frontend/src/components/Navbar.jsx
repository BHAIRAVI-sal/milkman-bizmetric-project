import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const homePath = "/";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link to={homePath} className="text-2xl font-bold text-pink-600">🥛 Velvet Milk Dairy</Link>

      <div className="flex gap-6 text-gray-600 font-medium">
        <Link to={homePath} className="hover:text-pink-600">Home</Link>
        <Link to="/products" className="hover:text-pink-600">Products</Link>
        <Link to="/cart" className="hover:text-pink-600">Cart</Link>
        <Link to="/dashboard" className="hover:text-pink-600">Dashboard</Link>
        {role === "admin" ? <Link to="/admin" className="hover:text-pink-600">Admin</Link> : null}
      </div>

      <div className="flex items-center gap-3">
        {!token ? (
          <>
            <Link to="/login" className="px-4 py-2 rounded-full border hover:bg-gray-50">
              Customer Login
            </Link>
            <Link to="/admin-login" className="px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700">
              Admin Login
            </Link>
          </>
        ) : (
          <button onClick={logout} className="px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
