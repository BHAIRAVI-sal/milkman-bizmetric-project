import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("https://bhairavisalunkhe.duckdns.org/api/accounts/login/admin/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.access) {
      localStorage.setItem("token", data.access);
      localStorage.setItem("role", data.role || "admin");
      if (data.username) localStorage.setItem("username", data.username);
      alert("Admin login successful");
      navigate("/admin");
    } else {
      alert(data.detail || "Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <input
          type="text"
          placeholder="Admin Username"
          className="w-full mb-4 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
