import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to={allowRole === "admin" ? "/admin-login" : "/login"} replace />;
  }

  if (allowRole && role !== allowRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
