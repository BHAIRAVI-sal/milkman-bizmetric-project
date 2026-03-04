import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState({});

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://127.0.0.1:8000/api/products/admin/stocks/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.detail || data?.error || "Failed to load stock");
        }
        if (!mounted) return;
        setRows(Array.isArray(data) ? data : []);
        setDirty({});
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || "Failed to load stock");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, [token]);

  const grouped = useMemo(() => {
    const m = new Map();
    for (const r of rows) {
      const key = `${r.product_id}`;
      if (!m.has(key)) m.set(key, { product_id: r.product_id, product_name: r.product_name, items: [] });
      m.get(key).items.push(r);
    }
    return Array.from(m.values()).sort((a, b) => a.product_id - b.product_id);
  }, [rows]);

  const onChange = (stockId, value) => {
    const v = value === "" ? "" : String(Math.max(0, Number(value)));
    setRows((prev) => prev.map((r) => (r.id === stockId ? { ...r, stock_count: v } : r)));
    setDirty((prev) => ({ ...prev, [stockId]: true }));
  };

  const save = async () => {
    try {
      setSaving(true);
      setError("");
      const changed = rows.filter((r) => dirty[r.id]);
      const payload = {
        items: changed.map((r) => ({
          product_id: r.product_id,
          quantity_id: r.quantity,
          stock_count: r.stock_count === "" ? 0 : Number(r.stock_count),
        })),
      };

      const res = await fetch("http://127.0.0.1:8000/api/products/admin/stocks/upsert/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.detail || data?.error || "Failed to save stock");
      }
      alert(`Saved: ${data?.updated ?? 0} item(s)`);
      setDirty({});
    } catch (e) {
      setError(e?.message || "Failed to save stock");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
            <div className="text-gray-600">Stock manager (per product + quantity)</div>
          </div>
          <button
            onClick={save}
            disabled={saving || !Object.keys(dirty).length}
            className="px-4 py-2 rounded bg-pink-600 text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {role !== "admin" ? (
          <div className="mt-8 p-4 bg-white rounded shadow text-red-600">You are not logged in as admin.</div>
        ) : null}

        {error ? (
          <div className="mt-6 p-4 bg-white rounded shadow text-red-600">{error}</div>
        ) : null}

        {loading ? (
          <div className="mt-8 text-gray-600">Loading stock...</div>
        ) : (
          <div className="mt-8 space-y-6">
            {grouped.map((g) => (
              <div key={g.product_id} className="bg-white rounded-2xl shadow p-6">
                <div className="font-bold text-lg mb-4">{g.product_name}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {g.items
                    .slice()
                    .sort((a, b) => String(a.quantity_label).localeCompare(String(b.quantity_label)))
                    .map((r) => (
                      <div key={r.id} className="border rounded-xl p-4">
                        <div className="text-sm text-gray-500">{r.quantity_label}</div>
                        <div className="mt-2 flex items-center gap-3">
                          <input
                            type="number"
                            min={0}
                            value={r.stock_count}
                            onChange={(e) => onChange(r.id, e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
