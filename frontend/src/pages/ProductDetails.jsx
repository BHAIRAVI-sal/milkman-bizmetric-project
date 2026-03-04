import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { getProducts } from "../lib/api";
import { getCategoryImage } from "../images/js/imagemap";
import { useCart } from "../store/cart.jsx";
import productImageMap from "../assets/productImageMap";

export default function ProductDetails() {
  const { id } = useParams();
  const { add } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedQty, setSelectedQty] = useState("");
  const [plan, setPlan] = useState("one-time");
  const [units, setUnits] = useState(1);

  const getFallbackImage = (p) => {
    // 1. Product-specific image from local map (highest priority)
    if (productImageMap[p.name]) return productImageMap[p.name];
    // 2. Backend image — only if it's not the seeded placeholder
    if (p.image && !p.image.includes("placeholder")) return `http://localhost:8000${p.image}`;
    // 3. Category image as last resort
    return getCategoryImage(p.category?.name || "Milk") || "/images/home-bg.png";
  };

  useEffect(() => {
    getProducts().then((data) => {
      const p = data.find((x) => String(x.id) === String(id));
      if (!p) return;

      const prices =
        Array.isArray(p.quantities) && p.quantities.length
          ? p.quantities
              .map((q) => {
                const label = q.label ?? q.quantity_label ?? q.quantityLabel ?? q.name ?? "";
                const price = Number(q.price ?? q.unit_price ?? q.unitPrice ?? q.amount);
                return { label: String(label), price };
              })
              .filter((q) => q.label && !Number.isNaN(q.price))
          : [];

      setProduct({
        id: p.id,
        name: p.name,
        description: p.description,
        category: p.category?.name || "Milk",
        milkType: p.milk_type?.name || "General",
        imageUrl: getFallbackImage(p),
        prices,
      });

      if (prices.length > 0) setSelectedQty((cur) => cur || prices[0].label);
    });
  }, [id]);

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const entry = product.prices.find((p) => p.label === selectedQty);
    if (!entry) return 0;
    let base = entry.price;
    if (plan === "daily") base *= 30;
    if (plan === "monthly") base = Math.round(base * 30 * 0.9);
    return base;
  }, [product, selectedQty, plan]);

  const totalPrice = useMemo(() => {
    return unitPrice * units;
  }, [unitPrice, units]);

  if (!product) return <div className="py-20 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 grid md:grid-cols-2 gap-10">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[420px] object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/home-bg.png";
            }}
          />
        </div>

        <div className="space-y-5">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description || "Fresh & farm-direct."}</p>

          <div>
            <p className="font-semibold mb-2">Select Quantity</p>
            <div className="flex gap-2 flex-wrap">
              {product.prices.map((q) => (
                <button
                  key={q.label}
                  onClick={() => setSelectedQty(q.label)}
                  className={`px-4 py-2 rounded-full border ${q.label === selectedQty ? "bg-pink-600 text-white" : "bg-white"}`}
                >
                  {q.label} - ₹{q.price}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Select Plan</p>
            <div className="flex gap-2">
              {["one-time", "daily", "monthly"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`px-4 py-2 rounded-full border ${p === plan ? "bg-pink-600 text-white" : "bg-white"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <p className="font-semibold">Units:</p>
            <button onClick={() => setUnits(Math.max(units - 1, 1))} className="px-3 py-1 bg-gray-200 rounded">-</button>
            <span>{units}</span>
            <button onClick={() => setUnits(units + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
          </div>

          <div className="text-2xl font-bold mt-2">₹ {totalPrice}</div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                add(
                  { ...product, imageUrl: product.imageUrl },
                  selectedQty,
                  unitPrice,
                  plan,
                  units
                );
                alert("Added to cart");
                navigate("/cart");
              }}
              className="px-6 py-3 bg-pink-600 text-white rounded-xl"
              disabled={!selectedQty || unitPrice <= 0}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="px-6 py-3 border rounded-xl">Go to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}