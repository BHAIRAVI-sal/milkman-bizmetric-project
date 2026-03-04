import { Link, Navigate } from "react-router-dom";
import Home from "./Home";

export default function AuthSelect() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role === "admin") return <Navigate to="/admin" replace />;
  if (token) return <Home />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[420px]">
        <h2 className="text-2xl font-bold mb-2 text-center">Choose Account Type</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Continue as Customer to shop, or Admin to manage products and stock.
        </p>

        <div className="space-y-4">
          <div className="border rounded-xl p-4">
            <div className="font-semibold">Customer</div>
            <div className="text-sm text-gray-600 mt-1">Browse products, add to cart, and place orders.</div>
            <div className="flex gap-3 mt-4">
              <Link
                to="/signup"
                className="flex-1 text-center bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="flex-1 text-center border py-2 rounded hover:bg-gray-50"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="border rounded-xl p-4">
            <div className="font-semibold">Admin</div>
            <div className="text-sm text-gray-600 mt-1">Update stock, add products, manage offers.</div>
            <div className="mt-4">
              <Link
                to="/admin-login"
                className="w-full block text-center bg-gray-900 text-white py-2 rounded hover:bg-black"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
